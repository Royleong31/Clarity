// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error TransferabilityDisabledTo(address to);

contract ClarityERC20 is ERC20, Ownable {
    // State variables
    bool public transferabilityFlag;

    /// @dev Token transferability whitelist
    mapping(address => bool) public transferabilityRegistry;

    // Events
    event TransferabilityFlagUpdate(bool mode);


    constructor() ERC20("CLARITY TOKEN", "CLARITY TOKEN") Ownable(_msgSender()) {
        transferabilityFlag = false;
    }

    /**
     * @notice Toggles the transferability mode of the token.
     * @param mode The mode to set for transferability (true = enabled, false = disabled).
     * @dev Only the contract owner can call this function.
     */
    function toggleTransferability(bool mode) external onlyOwner {
        transferabilityFlag = mode;
        emit TransferabilityFlagUpdate(mode);
    }

    /**
     * @notice Overrides the `_update` function to enforce transfer restrictions.
     * @param from The address tokens are being transferred from.
     * @param to The address tokens are being transferred to.
     * @param value The amount of tokens being transferred.
     * @dev This function ensures that only whitelisted addresses can perform transfers
     * if the transfer restrictions are enabled.
     */
    function _update(address from, address to, uint256 value) internal virtual override {
        // Check if transfer restrictions are active
        if (transferabilityFlag) {
            // Allow transfers only to whitelisted addresses or during minting/burning operations
            if (!transferabilityRegistry[to]) {
                revert TransferabilityDisabledTo(to);
            }
        }

        super._update(from, to, value);
    }
}
