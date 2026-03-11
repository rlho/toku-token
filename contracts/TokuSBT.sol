// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokuSBT — Soulbound Token for recording good deeds
/// @notice Non-transferable ERC-721. Once minted, it stays with the recipient forever.
contract TokuSBT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("Toku", "TOKU") Ownable(msg.sender) {}

    /// @notice Mint a new SBT to the specified address. Only callable by the contract owner.
    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }

    /// @notice Total number of SBTs minted so far
    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }

    // --- Soulbound: disable all transfers ---

    function transferFrom(address, address, uint256) public pure override {
        revert("SBT: transfer not allowed");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("SBT: transfer not allowed");
    }

    function approve(address, uint256) public pure override {
        revert("SBT: approval not allowed");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("SBT: approval not allowed");
    }
}
