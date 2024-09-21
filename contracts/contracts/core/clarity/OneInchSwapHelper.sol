// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { TokenHelper } from "../helpers/TokenHelper.sol";
// import {BoringOwnable} from "../helpers/BoringOwnable.sol";

error InvalidAddress(address);
error SwapNativeToTokenError();
error SwapTokenToTokenError();

contract OneInchSwapHelper is TokenHelper {

    struct SwapDescription {
        IERC20 srcToken;
        IERC20 dstToken;
        address payable srcReceiver;
        address payable dstReceiver;
        uint256 amount;
        uint256 minReturnAmount;
        uint256 flags;
    }

    address public aggregationRouter;

    constructor(address router) {
        if (router == address(0)) {
            revert InvalidAddress(address(0));
        }
        aggregationRouter = router;
    }

    function _swapNativeToToken(bytes calldata _data) internal returns (uint256 returnAmount) {
        // Perform the swap by calling the router with ETH (msg.value is the amount of ETH sent)
        (bool succ, bytes memory _resData) = address(aggregationRouter).call{value: msg.value}(_data);

        if (succ) {
            returnAmount = _decodeSwapReturnData(_resData);
        } else {
            revert SwapNativeToTokenError();
        }
    }

    function _swapTokenToToken(address tokenIn, uint256 tokenAmount, bytes calldata _data) internal returns (uint256 returnAmount) {
        IERC20 token = IERC20(tokenIn);
        token.transferFrom(msg.sender, address(this), tokenAmount);
        token.approve(aggregationRouter, tokenAmount);

        (bool succ, bytes memory _resData) = address(aggregationRouter).call(_data);
        if (succ) {
            returnAmount = _decodeSwapReturnData(_resData);
        } else {
            revert SwapTokenToTokenError();
        }
    }
    // function _swap(bytes calldata _data) internal {
    //     (address _c, SwapDescription memory desc, bytes memory _d) = abi.decode(_data[4:], (address, SwapDescription, bytes));

    //     IERC20(desc.srcToken).transferFrom(msg.sender, address(this), desc.amount);
    //     IERC20(desc.srcToken).approve(aggregationRouter, desc.amount);

    //     (bool succ, bytes memory _data) = address(aggregationRouter).call(_data);
    //     if (succ) {
    //         (uint returnAmount, uint gasLeft) = abi.decode(_data, (uint, uint));
    //         require(returnAmount >= minOut);
    //     } else {
    //         revert SwapError();
    //     }
    // }

    function _decodeSwapReturnData(bytes memory returnData) internal pure returns (uint256 returnAmount) {
        // Check the length of the return data to determine how to decode
        if (returnData.length == 32) {
            // If the length is 32 bytes, decode a single uint256 (returnAmount)
            return returnAmount = abi.decode(returnData, (uint256));
        } else if (returnData.length == 64) {
            // If the length is 64 bytes, decode both returnAmount and spentAmount
            (returnAmount, ) = abi.decode(returnData, (uint256, uint256));
        } else {
            revert("Unexpected return data length");
        }
    }
}