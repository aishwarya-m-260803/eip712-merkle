// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Verify is EIP712 {
    using ECDSA for bytes32;

    // 🌳 Merkle Root (whitelist)
    bytes32 public merkleRoot;

    constructor(bytes32 _merkleRoot) EIP712("MyApp", "1") {
        merkleRoot = _merkleRoot;
    }

    // 📦 Message structure
    struct Message {
        address user;
        string content;
    }

    // 🔑 Typehash
    bytes32 private constant MESSAGE_TYPEHASH =
        keccak256("Message(address user,string content)");

    // 🔐 EIP-712 Signature Verification
    function verifySignature(
        address signer,
        Message calldata message,
        bytes calldata signature
    ) public view returns (bool) {

        bytes32 structHash = keccak256(
            abi.encode(
                MESSAGE_TYPEHASH,
                message.user,
                keccak256(bytes(message.content))
            )
        );

        bytes32 digest = _hashTypedDataV4(structHash);

        return digest.recover(signature) == signer;
    }

    // 🌳 Merkle Proof Verification
    function verifyWhitelist(
        address user,
        bytes32[] calldata proof
    ) public view returns (bool) {

        bytes32 leaf = keccak256(abi.encodePacked(user));

        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    // 🔥 COMBINED (Final logic)
    function verifyAll(
        address signer,
        Message calldata message,
        bytes calldata signature,
        bytes32[] calldata proof
    ) public view returns (bool) {

        bool isValidSignature = verifySignature(signer, message, signature);
        bool isWhitelisted = verifyWhitelist(signer, proof);

        return isValidSignature && isWhitelisted;
    }
}