// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ClarityERC20 } from "./ClarityERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { IWorldID } from "../../interfaces/IWorldID.sol";
import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import { BytesHelperLib } from "../libraries/BytesHelperLib.sol";

// Errors
error InvalidNullifier(); // Thrown when attempting to reuse a nullifier
error ZeroAddress(); // Thrown when attempting to use a zero address

/// @title ClaritySPHook Contract
/// @notice Implements interaction with WorldID for user attestation and rewards management.
/// @dev Inherits from ISPHook and ClarityERC20, uses BytesHelperLib for bytes operations.
contract ClaritySPHook is ISPHook, ClarityERC20 {
    using BytesHelperLib for bytes;

    // Constants
    uint256 public immutable GROUP_ID = 1; // WorldID group ID (always 1)

    // Immutable state variables
    IWorldID public immutable worldId; // WorldID instance used for verifying proofs
    uint256 public immutable externalNullifier; // External nullifier hash for this contract

    // Mappings
    mapping(uint256 => uint256) internal attestationIdToNullifierHashRegistry; // Maps attestation ID to nullifier hash
    mapping(uint256 => uint256) internal nullifierHashToPointsRegistry; // Maps nullifier hash to points
    mapping(uint256 => address) internal nullifierHashToUserRegistry; // Maps nullifier hash to user rewards collector address

    // Events
    event Initialised(address worldId, uint256 externalNulliflier);
    event UserAttestationRewardMint(uint256 indexed nullifierHash, uint256 amount, uint64 attestationId);
    event UserAttestationRewardBurn(uint256 indexed nullifierHash, uint256 amount, uint64 attestationId);
    event UserCollectorRegister(uint256 indexed nullifierHash, address collector);

    /// @notice Constructor to initialize the contract.
    /// @param _worldId The WorldID instance for proof verification.
    /// @param _appId The WorldID app ID.
    /// @param _actionId The WorldID action ID.
    constructor(address _worldId, string memory _appId, string memory _actionId) {
        if (_worldId == address(0)) revert ZeroAddress();
        worldId = IWorldID(_worldId);

        // Generate external nullifier using app ID and action ID
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
        
        emit Initialised(_worldId, externalNullifier);
    }

    /// @notice Handles the reception of an attestation.
    /// @dev This function verifies the humanhood via WorldID contract and stores the nullifier hash.
    /// @param attestationId The ID of the attestation.
    /// @param extraData Encoded data containing signal, root, nullifier hash, and proof.
    function didReceiveAttestation(
        address, 
        uint64, 
        uint64 attestationId, 
        bytes calldata extraData
    ) 
        external 
        payable 
    {
        // Decode the parameters from the bytes input
        (
            address signal,
            uint256 root,
            uint256 nullifierHash,
            uint256[8] memory proof
        ) = abi.decode(extraData, (address, uint256, uint256, uint256[8]));

        // Map the attestation ID to the nullifier hash
        attestationIdToNullifierHashRegistry[attestationId] = nullifierHash;

        // Verify the humanhood via WorldID contract
        worldId.verifyProof(
            root,
            GROUP_ID,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // Once verified, linearly earned points tagged to the nullifier hash ( ALTERNATIVE SUGGESTION) additional logic (e.g., gacha) can be implemented here
        _mintReviewReward(nullifierHash, attestationId);
    }

    /// @notice Handles the reception of an attestation with resolver fee (Not in used).
    function didReceiveAttestation(
        address attester, 
        uint64 schemaId, 
        uint64 attestationId, 
        IERC20 resolverFeeERC20Token, 
        uint256 resolverFeeERC20Amount, 
        bytes calldata extraData
    ) 
        external 
    {}

    /// @notice Handles the reception of an attestation revocation.
    /// @dev Removes the attestation ID to nullifier hash mapping and revokes associated rewards.
    /// @param attestationId The ID of the attestation to be revoked.
    function didReceiveRevocation(
        address, 
        uint64, 
        uint64 attestationId, 
        bytes calldata
    ) 
        external 
        payable 
    {
        // Get the nullifier hash for the attestation ID
        uint256 nullifierHash = attestationIdToNullifierHashRegistry[attestationId];

        // Remove the mapping and revoke rewards
        attestationIdToNullifierHashRegistry[attestationId] = 0;
        _revokeReviewRewards(nullifierHash, attestationId);
    }

    /// @notice Handles the reception of an attestation revocation with resolver fee.
    function didReceiveRevocation(
        address attester, 
        uint64 schemaId, 
        uint64 attestationId, 
        IERC20 resolverFeeERC20Token, 
        uint256 resolverFeeERC20Amount, 
        bytes calldata extraData
    ) 
        external 
    {}

    /// @notice Verifies the user and assigns the collector address for rewards.
    /// @param collector The address of the rewards collector.
    /// @param verifyingData Encoded data containing signal, root, nullifier hash, and proof.
    function proveUserAndAssignCollector(
        address collector, 
        bytes calldata verifyingData
    ) 
        external 
    {
        _verifyUserAndAssignRewardsAddress(collector, verifyingData);
    }

    /// @dev Verifies the user and assigns the rewards collector address internally.
    /// @param collector The address of the rewards collector.
    /// @param data Encoded data containing signal, root, nullifier hash, and proof.
    function _verifyUserAndAssignRewardsAddress(
        address collector, 
        bytes calldata data
    ) 
        internal 
    {
        (
            address signal,
            uint256 root,
            uint256 nullifierHash,
            uint256[8] memory proof
        ) = abi.decode(data, (address, uint256, uint256, uint256[8]));

        // Verify proof using WorldID contract
        worldId.verifyProof(
            root,
            GROUP_ID,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // Assign the collector address to the nullifier hash
        nullifierHashToUserRegistry[nullifierHash] = collector;

        emit UserCollectorRegister(nullifierHash, collector);
    }

    /// @notice Retrieves the nullifier hash associated with a given attestation ID.
    /// @param attestationId The ID of the attestation to query.
    /// @return nullifierHash The nullifier hash associated with the specified attestation ID.
    function getNullifierHashFromAttestationId(
        uint256 attestationId
    ) 
        external 
        view 
        returns (uint256 nullifierHash) 
    {
        return attestationIdToNullifierHashRegistry[attestationId];
    }

    /// @notice Retrieves the points amount associated with a given nullifier hash.
    /// @param nullifierHash The nullifier hash to query.
    /// @return pointsAmount The amount of points associated with the specified nullifier hash.
    function getPointsForNullifierHash(
        uint256 nullifierHash
    ) 
        external 
        view 
        returns (uint256 pointsAmount) 
    {
        return nullifierHashToPointsRegistry[nullifierHash];
    }

    /// @dev Internal function to mint review reward points.
    /// @param nullifierHash The nullifier hash to which points are to be assigned.
    /// @param attestationId The review attestationId to which the worldId belongs to.
    function _mintReviewReward(uint256 nullifierHash, uint64 attestationId) internal {
        nullifierHashToPointsRegistry[nullifierHash] += 1;

        emit UserAttestationRewardMint(nullifierHash,  1, attestationId);
    }

    /// @dev Internal function to revoke review reward points.
    /// @param nullifierHash The nullifier hash for which points are to be revoked.
        /// @param attestationId The review attestationId to which the worldId belongs to.
    function _revokeReviewRewards(uint256 nullifierHash, uint64 attestationId) internal {
        nullifierHashToPointsRegistry[nullifierHash] -= 1;

        emit UserAttestationRewardBurn(nullifierHash,  1, attestationId);
    }
}
