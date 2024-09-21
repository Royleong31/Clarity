// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Order} from "../clarity/models/Order.sol";

library ServiceOrderLib {

    function isOrderSettled(Order memory order) internal pure returns (bool) {
        return (order.settled);
    }
}
