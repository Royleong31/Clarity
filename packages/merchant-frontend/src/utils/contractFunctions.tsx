import { encodeFunctionData, parseAbi } from "viem";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./Constants";

const SEPOLIA_MAIN_CONTRACT = CONTRACT_ADDRESS;

export const settlePaymentOnlyByBaseCurrencyTransaction = (orderId: string) => {
  console.log("calling pay function");
  return {
    to: SEPOLIA_MAIN_CONTRACT,
    data: encodeFunctionData({
      // abi: abi.abi,
      abi: parseAbi([
        "function settlePaymentOnlyByBaseCurrency(string memory rawOrderId) external",
      ]),
      functionName: "settlePaymentOnlyByBaseCurrency",
      args: [orderId],
    }),
  };
};

export const approve = (tokenAddress: string, amount: number) => {
  console.log("approving token");
  return {
    to: tokenAddress,
    data: encodeFunctionData({
      // abi: erc20ABI.abi,
      // abi: parseAbi(["function safeMint(address to) public"]),
      abi: parseAbi([
        "function approve(address spender, uint256 value) public",
      ]),
      functionName: "approve",
      args: [SEPOLIA_MAIN_CONTRACT, BigInt(amount)],
    }),
  };
};

export function encodeClarityReview(ratings: number, comment: string): string {
  const REVIEW_TYPES = ["uint256", "string"];

  return ethers.AbiCoder.defaultAbiCoder().encode(REVIEW_TYPES, [
    ratings,
    comment,
  ]);
}

export function encodeWorldcoinProof(
  signal: string,
  root: string,
  nullifierHash: string,
  proof: string
): string {
  const newSignal = "0x1234567890123456789012345678901234567890"; // Example address for signal

  const newRoot =
    "1234567890123456789012345678901234567890123456789012345678901234"; // Example uint256 for root
  const newNullifierHash =
    "1234567890123456789012345678901234567890123456789012345678901234"; // Example uint256 for nullifierHash

  const newProof = ["1", "1", "1", "1", "1", "1", "1", "1"];
  const types = [
    "address", // signal
    "uint256", // root
    "uint256", // nullifierHash
    "uint256[8]", // proof
  ];

  return ethers.AbiCoder.defaultAbiCoder().encode(types, [
    newSignal,
    newRoot,
    newNullifierHash,
    newProof,
  ]);
}

export const reviewTransaction = (
  orderId: string,
  data: `0x{string}`,
  encodedProof: `0x{string}`
) => {
  console.log("approving token");
  console.log("order id", orderId);
  console.log("data: ", data);
  console.log("encodedProof: ", encodedProof);

  return {
    to: SEPOLIA_MAIN_CONTRACT,
    data: encodeFunctionData({
      abi: parseAbi([
        "function attestReview(string memory rawOrderId, bytes calldata data, bytes calldata encodedProof) external",
      ]),
      functionName: "attestReview",
      args: [orderId, data, encodedProof],
    }),
  };
};
