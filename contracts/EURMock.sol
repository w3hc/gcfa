// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact good@juglas.name
contract EURMock is ERC20 {
    constructor() ERC20("GoodEuro", "gEUR") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function decimals() public pure override(ERC20) returns (uint8) {
        return 18;
    }
}
