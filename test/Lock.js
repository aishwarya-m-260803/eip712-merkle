const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

describe("EIP712 + Merkle Combined", function () {
  it("should verify signature AND whitelist", async function () {

    const [user1, user2, user3] = await ethers.getSigners();

    // 🌳 Step 1: Whitelist
    const whitelist = [
      user1.address,
      user2.address,
      user3.address
    ];

    const leaves = whitelist.map(addr => keccak256(addr));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getHexRoot();

    // 🚀 Step 2: Deploy contract
    const Verify = await ethers.getContractFactory("Verify");
    const verify = await Verify.deploy(root);
    await verify.waitForDeployment();

    // 👤 Step 3: Pick user
    const user = user1;

    // 🌳 Step 4: Generate proof
    const leaf = keccak256(user.address);
    const proof = tree.getHexProof(leaf);

    // 🧠 Step 5: Prepare EIP-712 data
    const network = await ethers.provider.getNetwork();

    const domain = {
      name: "MyApp",
      version: "1",
      chainId: network.chainId,
      verifyingContract: await verify.getAddress()
    };

    const types = {
      Message: [
        { name: "user", type: "address" },
        { name: "content", type: "string" }
      ]
    };

    const value = {
      user: user.address,
      content: "Final Test"
    };

    // 🔐 Step 6: Sign message
    const signature = await user.signTypedData(domain, types, value);

    // 🔥 Step 7: Call combined function
    const result = await verify.verifyAll(
      user.address,
      value,
      signature,
      proof
    );

    console.log("Final verification:", result);

    expect(result).to.equal(true);
  });
});