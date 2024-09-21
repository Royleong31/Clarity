// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { TokenHelper } from "../helpers/TokenHelper.sol";

// Interfaces
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

// Libraries
import { StringHelperLib } from "../libraries/StringHelperLib.sol";

// Models
import { Order } from "./models/Order.sol";


error ZeroBalance();
error InvalidMerchant();
error InvalidMerchantId(uint256 merchantId);
error NotSPHookInstance();
error OrderExists(bytes32 orderId);
error InvalidMatchingAmount(address token, uint256 amount);

contract ClarityController is TokenHelper {
    using StringHelperLib for string;

    address public BASE_CURRENCY; // USDC or other stablecoins
    uint256 public totalOrders;
    uint256 public totalMerchants;
    
    /// @notice Stores order details mapped by a unique order ID.
    /// @dev Maps each unique `orderId` to the corresponding `Order` struct.
    mapping(bytes32 => Order) public orderRegistry;

    /// @notice Maps a unique merchant ID to the active address of the merchant.
    /// @dev This keeps track of the active address associated with each merchant ID.
    mapping(uint256 => address) public merchantRegistry;

    /// @notice Tracks the revenue balances for each merchant by their merchant ID.
    /// @dev Keeps a record of the total revenue earned by each merchant. Balances can be withdrawn by merchants.
    mapping(uint256 => uint256) public merchantBalances;

    event MerchantRegistered(uint256 indexed merchantId, address indexed merchantAddress);
    event MerchantUpdate(uint256 indexed merchantId, address indexed merchantAddress);
    event OrderCreated(bytes32 indexed orderId, uint256 indexed merchantId, uint256 amount); // @CHANGE TO EVENT ID
    event PaymentReceived(bytes32 indexed orderId, uint256 indexed merchantId, address indexed payee, uint256 amount);
    event RevenueWithdrawn(uint256 indexed merchantId, uint256 amount);

    constructor(address _baseCurrency) {
        BASE_CURRENCY = _baseCurrency;
    }

    /**
     * @dev Modifier to ensure that the merchant ID provided is valid and registered.
     * @param merchantId The unique identifier of the merchant to check.
     * @notice This modifier reverts with `InvalidMerchantId` if the provided `merchantId` exceeds the total number of merchants.
     */
    modifier registeredMerchant(uint256 merchantId) {
        if (merchantId > totalMerchants) revert InvalidMerchantId(merchantId);
        _;
    }

    /**
     * @notice Registers a new merchant.
     * @param merchant The address of the merchant to be registered.
     * @dev Emits a `MerchantRegistered` event upon successful registration.
     */
    function registerMerchant(address merchant) external {
        totalMerchants++;
        uint256 merchantId = totalMerchants;
        merchantRegistry[merchantId] = merchant;

        emit MerchantRegistered(merchantId, merchant);
    }

    /**
     * @notice Updates the address of an existing registered merchant.
     * @param merchantId The ID of the merchant to update.
     * @param merchant The new address of the merchant.
     * @dev Only callable if the merchant is already registered. Emits a `MerchantUpdate` event.
     */
    function updateMerchant(uint256 merchantId, address merchant) 
        external 
        registeredMerchant(merchantId) 
    {
        merchantRegistry[merchantId] = merchant;

        emit MerchantUpdate(merchantId, merchant);
    }

    /**
     * @notice Allows a merchant to withdraw their accumulated revenue.
     * @param merchantId The unique identifier of the merchant.
     * @dev The caller must be the registered merchant address. The function will revert if the merchant has no balance.
     */
    function withdrawRevenue(uint256 merchantId) external {
        address merchantAddress = merchantRegistry[merchantId];
        
        // Ensure that the caller is the registered merchant
        if (msg.sender != merchantAddress) revert InvalidMerchant();

        uint256 balance = merchantBalances[merchantId];
        
        // Revert if the merchant has no balance to withdraw
        if (balance == 0) revert ZeroBalance();
        
        // Reset the merchant's balance to zero before transferring funds
        merchantBalances[merchantId] = 0;
        _transferOut(BASE_CURRENCY, msg.sender, balance);

        emit RevenueWithdrawn(merchantId, balance);
    }

    /**
     * @notice Internal function to create an outstanding order for a transaction.
     * @dev This function is called by the merchant to initialize an order with specific details.
     * It associates a unique `orderId` with the merchant and transactee and sets the initial order status.
     * @param orderId A unique identifier for the order, represented as a `bytes32` value.
     * @param merchantId The ID of the merchant associated with the order.
     * @param amount The total amount for the order.
     * @param referenceId A reference ID associated with the order, represented as `bytes` data. 
     *                    This could be used to store additional metadata or identifiers for the order.
     * 
     * Emits an `OrderCreated` event indicating that a new order has been created with the given details.
     */
    function _createOutstandingOrder(
        bytes32 orderId, 
        uint256 merchantId, 
        uint256 amount, 
        bytes calldata referenceId
    ) 
        internal 
    {
        totalOrders++; // Increment the total number of orders
        // To check if merchanty has been registered
        if (orderRegistry[orderId].merchantId > 0) revert OrderExists(orderId);

        // Create the new order and associate the merchant and transactee
        orderRegistry[orderId] = Order({
            amount: amount,
            merchantId: merchantId,
            payee: address(0), // Initially, no payee is set
            reviewAttestationId: 0, // No review attestation yet
            settled: false, // The order is not settled initially
            referenceId: referenceId // Reference ID for additional metadata
        });

        // Emit an event to log the creation of a new order
        emit OrderCreated(orderId, merchantId, amount);
    }

    function getOrderByStringId(string memory rawOrderId) external view returns (Order memory order) {
        bytes32 orderId = rawOrderId.stringToBytes32();
        order = orderRegistry[orderId];
    }

    /**
     * @dev Returns the base currency address used in the contract.
     * @return currency The base currency address.
     */
    function _getBaseCurrency() internal view returns (address currency) {
        return BASE_CURRENCY;
    }



}