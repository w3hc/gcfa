// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/extensions/ERC20Wrapper.sol)

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @dev Extension of the ERC20 token contract to support token wrapping.
 *
 * Users can deposit and withdraw "underlying tokens" and receive a matching number of "wrapped tokens". This is useful
 * in conjunction with other modules. For example, combining this wrapping mechanism with {ERC20Votes} will allow the
 * wrapping of an existing "basic" ERC20 into a governance token.
 *
 * _Available since v4.2._
 */
abstract contract ERC20Wrapper is ERC20 {
    IERC20 public immutable underlying;
    address public immutable recoveryAddress;
    uint256 public immutable rate;

    constructor(
        string memory name_,
        string memory symbol_,
        IERC20 underlying_,
        address recoveryAddress_,
        uint256 rate_
    ) ERC20(name_, symbol_) {
        underlying = underlying_;
        recoveryAddress = recoveryAddress_;
        rate = rate_;
    }

    /**
     * @dev See {ERC20-decimals}.
     */
    function decimals() public view virtual override returns (uint8) { 
        return 0;
    }

    /**
     * @dev Allow a user to deposit underlying tokens and mint the corresponding number of wrapped tokens.
     */
    function depositFor(
        address account,
        uint256 amountEUR
    ) public virtual returns (bool) {
        SafeERC20.safeTransferFrom(
            underlying,
            account,
            address(this),
            amountEUR
        );
        _mint(account, (amountEUR * rate) / 1000);
        return true;
    }

    /**
     * @dev Allow a user to burn a number of wrapped tokens and withdraw the corresponding number of underlying tokens.
     */
    function withdrawTo(
        address account,
        uint256 amountCFA
    ) public virtual returns (bool) {
        _burn(account, amountCFA);
        SafeERC20.safeTransfer(underlying, account, (amountCFA * 1000) / rate);
        return true;
    }

    /**
     * @dev Mint wrapped token to cover any underlyingTokens that would have been transferred by mistake.
     */
    function recoverEUR() public virtual returns (uint256) {
        uint256 value = (underlying.balanceOf(address(this)) * rate) /
            1000 -
            totalSupply();
        _mint(recoveryAddress, value);
        return value;
    }

    /**
     * @dev Burn wrapped token to cover any wrapped token that would have been transferred by mistake.
     */
    function recoverCFA() public virtual returns (uint256) {
        uint256 value = balanceOf(address(this));
        if (value > 0) {
            _burn(address(this), value);
            SafeERC20.safeTransfer(
                underlying,
                recoveryAddress,
                (value / rate) * 1000
            );
        }
        return value;
    }
}
