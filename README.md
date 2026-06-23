# 🔐 EIP712 + MERKLE TREE IMPLEMENTATION

## Description

This system implements a secure verification system using EIP-712 signature and Merkle Tree based whitelisting.

It ensures that only authenticated and authorized users can interact with the smart contract.

---

## Features :
- EIP712 structured data signing
- Signature verification using ECDSA
- Merkle Tree whitelist verification
- Combined Verification (signature + whitelist)

---

## How It Works
1. User signs a message off-chain using their wallet
2. Amerkle proof is generated to prove whitelist membership
3. Smart contract verifies:
   - Signature Validity
   - Whitelist Eligibility

---

## Tech Stack 
- Solidity
- Hardhat
- Ethers.js
- OpenZeppelin
- merkletree.js

---

## Project Structure

```
|
├contracts/
│ └Verify.sol      # Smart Contract (EIP-712 + Merkle)
│
├scripts/
│ └merkle.js       # Merkle tree generation
│
├test/
│ └verify.js       # Test Cases (signature + whitelist)
│
├hardhat.config.js # hardhat Configuration
├package.json      # Dependencies
├README.md         # Project Documentation

```

---

## Installation and Setup

 # Clone the repository 
 [git clone] (https://github.com/aishwarya-m-260803/eip712-merkle.git)

 # Navigate to the project
 cd eip712-merkle

 # Install dependencies
 npm install

 # Compile Contracts
 npx hardhat compile

 # Run tests
 npx hardhat test

---

## What I learnt

- EIP-712 structured data signing
- Off-chain vs on-chain verification
- Signature validation using ECDSA

---

## Future Improvement

- Frontend Integration (React + Metamask)
- Implementing Nonce for replay protection
- Deploying on testnet

---

## Author
Aishwarya M

---

 
 
 
   





