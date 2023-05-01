// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC20Wrapper.sol";

/**
 * @dev FuseCFA ERC20 token wrapped from FuseEuro
 *
 * Users can deposit and withdraw FuseEuro and receive a matching number of FuseCFA.
 */
contract gCFA is ERC20Wrapper {
    constructor(
        IERC20 wrappedToken,
        address recoveryAddress,
        uint256 rate
    ) ERC20Wrapper("Good CFA", "gCFA", wrappedToken, recoveryAddress, rate) {
        return;
    }
}
