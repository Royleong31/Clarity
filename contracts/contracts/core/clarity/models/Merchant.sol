// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

    struct Order {
        uint256 merchantId;
        address payee;
        bytes referenceId;
        // uint64 paymentAttestationId; // Payment attestation
        uint64 reviewAttestationId; // Review attestation
        uint256 amount;
        bool settled; // payment is settled
    }



