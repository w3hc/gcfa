// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IIdentity {
	function isWhitelisted(address user) external view returns (bool);
}

interface INameService {
	function getAddress(string memory _name) external view returns (address);
}
