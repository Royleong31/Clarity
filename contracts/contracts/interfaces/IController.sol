// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface IController {
    // Events
    event OrderCreated(uint256 indexed orderId, address indexed merchant, uint256 amount);
    event PaymentReceived(uint256 indexed orderId, address indexed merchant, address indexed transactee, uint256 amount);
    event RevenueWithdrawn(address indexed merchant, uint256 amount);

    // Functions
    function createOutstandingOrder(uint256 amount) external;

    function completeOrderPayment(uint256 orderId, address merchant, uint256 amount) external payable;

    function withdrawRevenue() external;

    function isOrderSettled(uint256 orderId) external view returns (bool);

    // State variables
    function BASE_CURRENCY() external view returns (address);

    function totalOrders() external view returns (uint256);

    function orders(uint256 orderId) external view returns (
        address merchant,
        address transactee,
        uint256 amount,
        bool settled
    );

    function merchantBalances(address merchant) external view returns (uint256);
}