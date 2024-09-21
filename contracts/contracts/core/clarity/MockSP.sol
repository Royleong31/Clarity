// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import { Schema } from "@ethsign/sign-protocol-evm/src/models/Schema.sol";

contract SP {
    //  /**
//      * @notice Registers a Schema.
//      * @dev Emits `SchemaRegistered`.
//      * @param schema See `Schema`.
//      * @param delegateSignature An optional ECDSA delegateSignature if this is a delegated attestation. Use `""` or `0x`
//      * otherwise.
//      * @return schemaId The assigned ID of the registered schema.
//      */
    function register(Schema memory , bytes calldata ) external returns (uint64 schemaId) {
        return 1;
    }
}
