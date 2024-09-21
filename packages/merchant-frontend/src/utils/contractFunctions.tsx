import abi from "../abi/Clarity.json";
import erc20ABI from "../abi/ERC20.json";
import { encodeFunctionData } from "viem";

const SEPOLIA_MAIN_CONTRACT = "0x479eE4d9BF5109bF6d55211871BE775C2e95eE58";

export const settlePaymentOnlyByBaseCurrencyTransaction = (
  orderId: string,
) => {
  console.log("calling pay function")
  return {
    to: SEPOLIA_MAIN_CONTRACT,
    data: encodeFunctionData({
      abi: abi.abi,
      functionName: "settlePaymentOnlyByBaseCurrency",
      args: [orderId],
    }),
  };
};

export const approve = (tokenAddress: string, amount: number) => {
  console.log("approving token")
  return {
    to: tokenAddress,
    data: encodeFunctionData({
      abi: erc20ABI.abi,
      functionName: "approve",
      args: [SEPOLIA_MAIN_CONTRACT, amount],
    }),
  };
};
