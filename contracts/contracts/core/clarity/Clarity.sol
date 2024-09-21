
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ClarityController } from "./ClarityController.sol";
import { OneInchSwapHelper } from "./OneInchSwapHelper.sol";
import { BoringOwnable } from "../helpers/BoringOwnable.sol";

// Interfaces
import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";

// Models
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import { Order } from "./models/Order.sol";
import { Schema } from "@ethsign/sign-protocol-evm/src/models/Schema.sol";

// Libraries
import { TimeLib } from "../libraries/TimeLib.sol";
import { BytesHelperLib } from "../libraries/BytesHelperLib.sol";
import { StringHelperLib } from "../libraries/StringHelperLib.sol";


error ConfirmationAddressMismatch();
error UnsettledOrderPayment(bytes32 orderId);
error NonexistentOrder(bytes32 orderId);
error ExistingOrder(bytes32 orderId);
error UnsettledOrder(bytes32 orderId);
error SettledOrderPayment(bytes32 orderId);
error OrderReviewed(bytes32 orderId);
error OrderUnreviewed(bytes32 orderId);

/// @title Clarity Contract
/// @notice Contract for managing payments and reviews with attestation and verification logic.
contract Clarity is BoringOwnable, ClarityController, OneInchSwapHelper {
    using BytesHelperLib for bytes;
    using StringHelperLib for string;

    ISP public spInstance; // Reference address book
    ISPHook public spHookInstance;
    uint64 public reviewSchemaId;

    // Events
    event Initialised(address owner, address spInstance, address spHook, address baseCurrency);
    event OrderPaymentSettled(bytes32 indexed orderId, uint256 indexed merchantId, address indexed payee, uint256 amount);
    event ReviewAttested(bytes32 indexed orderId, address indexed payee, uint64 attestationId);

    /// @notice Initializes the contract with necessary parameters.
    /// @param _schemaId The schema Id of the Sign Protocol review shema registered.
    /// @param _spInstance The address of the Sign Protocol instance.
    /// @param _spHook The address of the Sign Protocol Hook instance.
    /// @param _baseCurrency The base currency for transactions.
    /// @param _aggregatorRouterV6 The address of the Aggregator Router for token swaps.
      constructor(
        uint64 _schemaId,
        address _spInstance, 
        address _spHook, 
        address _baseCurrency, 
        address _aggregatorRouterV6
    ) 
        BoringOwnable(_msgSender()) 
        ClarityController(_baseCurrency) 
        OneInchSwapHelper(_aggregatorRouterV6) 
    { 
        spInstance = ISP(_spInstance);
        reviewSchemaId = _schemaId;
        spHookInstance = ISPHook(_spHook);

        emit Initialised(_msgSender(), _spInstance, _spHook, _baseCurrency);
    }

    modifier unusedOrderIdOnly(string memory rawOrderId) {
        bytes32 orderId = rawOrderId.stringToBytes32();
        if (!_isNewOrderId(orderId)) revert ExistingOrder(orderId);
        _;
    }

    modifier existingOrderOnly(bytes32 orderId) {
        if (_isNewOrderId(orderId)) revert NonexistentOrder(orderId);
        _;
    }

    modifier unsettledOrderOnly(bytes32 orderId) {
        if (_isOrderSettled(orderId)) revert UnsettledOrderPayment(orderId);
        _;
    }

    modifier settledOrderOnly(bytes32 orderId) {
        if (!_isOrderSettled(orderId)) revert UnsettledOrderPayment(orderId);
        _;
    }

    modifier unreviewedOrderOnly(bytes32 orderId) {
        if(!_isOrderReviewed(orderId)) revert OrderReviewed(orderId);
        _;
    }

    modifier reviewedOrderOnly(bytes32 orderId) {
        if(_isOrderReviewed(orderId)) revert OrderUnreviewed(orderId);
        _;
    }

    /// @notice Sets the Sign Protocol instance.
    /// @param instance The address of the new Sign Protocol instance.
    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    /// @notice Sets the Sign Protocol Hook instance.
    /// @param hookInstance The address of the new Sign Protocol Hook instance.
    function setSPHookInstance(address hookInstance) external onlyOwner {
        spHookInstance = ISPHook(hookInstance);
    }

    /// @notice Sets the schema ID for reviews.
    /// @param schemaId_ The schema ID to be set for reviews.
    function setReviewSchemaID(uint64 schemaId_) external onlyOwner {
        reviewSchemaId = schemaId_;
    }

    /// @notice Creates a new order for a transaction.
    /// @param rawOrderId The string id of the order.
    /// @param merchantId The id of the merchant.
    /// @param amount The amount for the order.
    /// @param referenceId The reference ID for the order.
    function createOrderForTransaction(string memory rawOrderId, uint256 merchantId, uint256 amount, bytes calldata referenceId) external onlyOwner {
        bytes32 orderId = rawOrderId.stringToBytes32();
        _createOutstandingOrder(orderId, merchantId, amount, referenceId);
    }
    
    /// @notice Settles payment using the base currency only.
    /// @param rawOrderId The ID of the order to be settled, as a string.
    function settlePaymentOnlyByBaseCurrency(string memory rawOrderId) external {
        // Convert the string order ID to bytes32 for internal use
        bytes32 orderId = rawOrderId.stringToBytes32();
        
        // Call the internal function to settle the payment using base currency
        _settleOrderPaymentByBaseCurrency(orderId);
    }

    /// @notice Settles payment using an alternative currency with a swap mechanism.
    /// @param rawOrderId The ID of the order to be settled, as a string.
    /// @param inputAmount The amount of the alternative currency input for the swap.
    /// @param currency The address of the alternative currency to swap.
    /// @param swapData Data required for performing the swap, typically from a DEX or swap helper.
    function settlePaymentOnlyByAltCurrency(
        string memory rawOrderId,
        uint256 inputAmount, 
        address currency, 
        bytes calldata swapData
    ) external {
        bytes32 orderId = rawOrderId.stringToBytes32();
        
        // Call the internal function to settle the payment using the alternative currency
        _settleOrderPayment(orderId, inputAmount, currency, swapData);
    }


    /// @notice Settles payment using the base currency and attests a review.
    /// @param rawOrderId The ID of the order to be settled.
    /// @param reviewData Data for the review attestation.
    /// @param encodedProof Encoded proof for attestation.
    /// @return reviewAttestationId The ID of the created review attestation.
    function settlePaymentByBaseCurrencyAndAttestReview(
        string memory rawOrderId, 
        bytes calldata reviewData,
        bytes calldata encodedProof
    ) 
        external 
        returns (uint64 reviewAttestationId) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();

        _settleOrderPaymentByBaseCurrency(orderId);
        reviewAttestationId = _attestReview(orderId, reviewData, encodedProof);
    }

    /// @notice Settles payment using an alternative currency and attests a review.
    /// @param rawOrderId The string ID of the order to be settled.
    /// @param inputAmount The amount of input currency.
    /// @param currency The address of the input currency.
    /// @param swapData Data required for swapping the input currency.
    /// @param reviewData Data for the review attestation.
    /// @param encodedProof Encoded proof for attestation.
    /// @return reviewAttestationId The ID of the created review attestation.
    function settlePaymentByAltCurrencyAndAttestReview(
        string memory rawOrderId, 
        uint256 inputAmount, 
        address currency, 
        bytes calldata swapData, 
        bytes calldata reviewData, 
        bytes calldata encodedProof
    ) 
        external 
        payable 
        returns (uint64 reviewAttestationId) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();
        _settleOrderPayment(orderId, inputAmount, currency, swapData);
        reviewAttestationId = _attestReview(orderId, reviewData, encodedProof);
    }



    /// @notice Attests a review for a settled order.
    /// @param rawOrderId The string ID of the order to be reviewed.
    /// @param data Data for the review attestation.
    /// @param encodedProof Encoded proof for attestation.
    /// @return attestationId The ID of the created review attestation.
    function attestReview(
        string memory rawOrderId, 
        bytes calldata data, 
        bytes calldata encodedProof
    ) 
        external 
        returns (uint64 attestationId) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();
        attestationId = _attestReview(orderId, data, encodedProof);
    }


    /// @notice Revokes a review attestation for an order.
    /// @param rawOrderId The string ID of the order whose review is to be revoked.
    function revokeReviewAttestation(string memory rawOrderId) external {
        bytes32 orderId = rawOrderId.stringToBytes32();
        _revokeReviewAttestation(orderId);
    }


    /// @notice Internal function to settle order payment.
    /// @param orderId The string ID of the order to be settled.
    /// @param inputAmount The amount of input currency.
    /// @param currency The address of the input currency.
    /// @param data Data required for swapping the input currency.
    function _settleOrderPayment(bytes32 orderId, uint256 inputAmount, address currency, bytes calldata data) existingOrderOnly(orderId) unsettledOrderOnly(orderId) internal {
        if (currency == BASE_CURRENCY) {
            _settleOrderPaymentByBaseCurrency(orderId);
        } else {
            Order memory order = orderRegistry[orderId];
            uint256 swappedAmount;

            if (currency == address(0)) {
                swappedAmount = _swapNativeToToken(data);
            } else {
                swappedAmount = _swapTokenToToken(currency, inputAmount, data);
            }

            _settleOrderPaymentByBaseCurrency(orderId);

            uint256 excessAmount = swappedAmount - order.amount;
            _transferOut(currency, msg.sender, excessAmount);
        }
    }


    /// @notice Internal function to settle order payment using the base currency.
    /// @param orderId The ID of the order to be settled.
    function _settleOrderPaymentByBaseCurrency(bytes32 orderId) internal {
        Order memory order = orderRegistry[orderId];
        if (order.settled) revert SettledOrderPayment(orderId);

        _transferIn(BASE_CURRENCY, msg.sender, order.amount);

        orderRegistry[orderId].payee = msg.sender;
        orderRegistry[orderId].settled = true;
        
        emit OrderPaymentSettled(orderId, order.merchantId, msg.sender, order.amount);
    }



    /// @notice Internal function to attest a review for a settled order.
    /// @param orderId The ID of the order to be reviewed.
    /// @param review Data for the review attestation.
    /// @param encodedProof Encoded proof for attestation.
    /// @return attestationId The ID of the created review attestation.
    function _attestReview(
        bytes32 orderId,
        bytes calldata review,
        bytes calldata encodedProof
    ) internal settledOrderOnly(orderId) returns (uint64 attestationId) {
        Order memory order = orderRegistry[orderId];
        if (order.reviewAttestationId != 0) revert OrderReviewed(orderId);
        		// We now verify the provided proof is valid and the user is verified by World ID
        address merchant = merchantRegistry[order.merchantId];
        bytes[] memory recipients = new bytes[](2);
        recipients[0] = abi.encode(merchant);
        recipients[1] = abi.encode(order.payee);   

        // Create a review attestation
        Attestation memory reviewAttestation = Attestation({
            schemaId: reviewSchemaId, // Schema for review
            linkedAttestationId: 0,
            attestTimestamp: uint64(block.timestamp),
            revokeTimestamp: 0,
            attester: address(this), // Transactee is the reviewer in this case
            validUntil: 0, // No expiration for the review attestation
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: review // Review metadata
        });

        bytes memory emptyData = new bytes(0);
        // Attest to sign protocol
        attestationId = spInstance.attest(reviewAttestation, "", emptyData, encodedProof); // extraData for hook callback
        // Save the review attestation Id
        orderRegistry[orderId].reviewAttestationId = attestationId;

        emit ReviewAttested(orderId, msg.sender, attestationId);
    }

    /// @notice Internal function to revoke a review attestation.
    /// @param orderId The order ID whose review attestation is to be revoked.
    function _revokeReviewAttestation(bytes32 orderId) reviewedOrderOnly(orderId) internal {
        uint64 attestationIdToRevoke = orderRegistry[orderId].reviewAttestationId;
        orderRegistry[orderId].reviewAttestationId = 0; // reset id

        bytes memory emptyBytes = new bytes(0);

        spInstance.revoke(attestationIdToRevoke, "", emptyBytes, emptyBytes);
    }

    /// @notice Retrieves the schema information for the review attestation.
    /// @return reviewSchema The schema information for the review attestation.
    function getReviewSchema() external view returns(Schema memory reviewSchema) {
        reviewSchema = spInstance.getSchema(reviewSchemaId);

    }

    /// @notice Retrieves the review attestation for a specific order.
    /// @param rawOrderId The string ID of the order whose review attestation is to be retrieved.
    /// @return reviewAttestation The attestation data for the order review.
    function getOrderReviewAttestation(string memory rawOrderId) 
        external 
        view 
        returns (Attestation memory reviewAttestation) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();
        Order memory order = orderRegistry[orderId];

        reviewAttestation = spInstance.getAttestation(order.reviewAttestationId);
    }


    /// @notice Checks if an order is settled.
    /// @param rawOrderId The string ID of the order to check.
    /// @return settled Returns true if the order is settled, false otherwise.
    function isOrderSettled(string calldata rawOrderId) 
        external 
        view 
        returns (bool settled) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();
        settled = _isOrderSettled(orderId);
    }

    /// @notice Checks if an order is reviewed.
    /// @param rawOrderId The ID of the order to check.
    /// @return reviewed Returns true if the order is reviewed, false otherwise.
    function isOrderReviewed(string memory rawOrderId) 
        external 
        view 
        returns (bool reviewed) 
    {
        bytes32 orderId = rawOrderId.stringToBytes32();
        reviewed = _isOrderReviewed(orderId);
    }


    /// @notice Internal function to check if an order Id is new.
    /// @param orderId The ID of the order to check.
    /// @return Returns true if the order Id is unused, false otherwise.
    function _isNewOrderId(bytes32 orderId) 
        internal 
        view 
        returns (bool) 
    {
        return orderRegistry[orderId].merchantId == 0;
    }


    /// @notice Internal function to check if an order is settled.
    /// @param orderId The ID of the order to check.
    /// @return Returns true if the order is settled, false otherwise.
    function _isOrderSettled(bytes32 orderId) 
        internal 
        view 
        returns (bool) 
    {
        return orderRegistry[orderId].settled;
    }

    /// @notice Internal function to check if an order has a review attestation.
    /// @param orderId The ID of the order to check.
    /// @return Returns true if the order has a review attestation, false otherwise.
    function _isOrderReviewed(bytes32 orderId) 
        internal 
        view 
        returns (bool) 
    {
        return orderRegistry[orderId].reviewAttestationId != 0;
    }
    
}