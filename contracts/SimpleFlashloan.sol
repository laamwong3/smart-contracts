// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleFlashloan is FlashLoanSimpleReceiverBase {
    using SafeMath for uint;
    event Log(address asset, uint val);

    constructor(IPoolAddressesProvider _provider)
        FlashLoanSimpleReceiverBase(_provider)
    {}

    function createFlashloan(address _asset, uint _amount) external {
        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(receiver, _asset, _amount, params, referralCode);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // something else
        // can decode params

        uint amountOwning = amount.add(premium);
        IERC20(asset).approve(address(POOL), amountOwning);
        emit Log(asset, amountOwning);
        return true;
    }
}
