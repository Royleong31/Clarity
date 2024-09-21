// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

library TimeLib {

    uint256 public constant ONE_HOUR = 3600;
    uint256 public constant THREE_HOURS = 10800;
    uint256 public constant ONE_DAY = 86400;
    uint256 public constant SEVEN_DAYS = 604800;

    function isCurrentlyExpired(uint256 expiry) internal view returns (bool) {
        return (expiry <= block.timestamp);
    }

    function isExpired(uint256 expiry, uint256 blockTime) internal pure returns (bool) {
        return (expiry <= blockTime);
    }

    function isTimeInThePast(uint256 timestamp) internal view returns (bool) {
        return (timestamp <= block.timestamp); // same definition as isCurrentlyExpired
    }
}
