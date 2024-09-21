   // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library StringHelperLib {
    /**
     * @notice Converts a `string` to a `bytes32` representation.
     * @dev This function is useful for converting a string into a fixed-size `bytes32` format,
     *      which is often required for use in indexed event fields or for compatibility with
     *      certain data structures. The function will pad or truncate the string to fit into
     *      32 bytes. If the string is shorter than 32 bytes, it will be padded with zeroes. 
     *      If the string is longer than 32 bytes, it will be truncated.
     * @param source The input string to be converted to `bytes32`.
     * @return result The `bytes32` representation of the input string. If the input string 
     *         is empty, the function returns a zero-filled `bytes32`.
     */
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        // Pad or truncate the string to fit into 32 bytes
        assembly {
            result := mload(add(source, 32))
        }
    }
}
   
   
   
   
