import { encodeFunctionData, parseAbi } from "viem";

const SEPOLIA_MAIN_CONTRACT = "0x479eE4d9BF5109bF6d55211871BE775C2e95eE58";

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
