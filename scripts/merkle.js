const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// Whitelist addresses
const whitelist = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333"
];

// Create leaves
const leaves = whitelist.map(addr => keccak256(addr));

// Create tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get root
const root = tree.getHexRoot();

// Pick a user
const user = whitelist[0];

// Get proof
const proof = tree.getHexProof(keccak256(user));

console.log("Merkle Root:", root);
console.log("User:", user);
console.log("Proof:", proof);