// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC20Wrapper.sol";
import "./Interfaces.sol";

/**
 * @dev gCFA ERC20 token wrapped from Euro stablecoin
 *
 * Users can deposit Euro stablecoin and receive a matching number of gCFA.
 * Users can withdraw gCFA and receive a matching number of Euro stablecoin.
 */
contract gCFA is ERC20Wrapper {
	INameService public nameService;

	constructor(
		IERC20 wrappedToken,
		address recoveryAddress,
		uint256 rate,
		INameService _nameService
	) ERC20Wrapper("Good CFA", "gCFA", wrappedToken, recoveryAddress, rate) {
		nameService = _nameService;
		return;
	}

	function depositFor(
		address account,
		uint16 amountEUR
	) public override returns (bool) {
		require(
			IIdentity(nameService.getAddress("IDENTITY")).isWhitelisted(msg.sender),
			"UBIScheme: not whitelisted"
		);
		return super.depositFor(account, amountEUR);
	}

	function setNameService(INameService _nameService) external {
		nameService = _nameService;
	}
}
