// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

struct Order {
    uint256 amount;              // 32 bytes
    uint256 merchantId;          // 32 bytes
    address payee;               // 20 bytes, fits in the first slot with remaining 12 bytes
    uint64 reviewAttestationId;  // 8 bytes, fits in the first slot with address
    bool settled;                // 1 byte, fits in the first slot with address and uint64
    bytes referenceId;         // 32 bytes, more efficient than `bytes` for fixed size data
}