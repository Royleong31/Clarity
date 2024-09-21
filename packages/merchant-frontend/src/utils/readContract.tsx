import { ethers } from "ethers";
import { useRpcProviders } from "@dynamic-labs/sdk-react-core";
import { evmProvidersSelector } from "@dynamic-labs/ethereum-core";
import { ChainId } from "@biconomy/core-types";
import { CONTRACT_ADDRESS } from "./Constants";

// Define your contract ABI (replace with your actual ABI)

// Replace with your contract address
const contractAddress = CONTRACT_ADDRESS;

// Function to read data from the contract, returning a boolean

export const isOrderReviewed = async (orderId: string) => {
  // Connect to the Ethereum network (using Infura or Alchemy)
  const contractABI = [
    "function isOrderReviewed(string memory rawOrderId) external view returns (bool reviewed)",
  ];

  const provider = new ethers.JsonRpcProvider(`https://rpc2.sepolia.org`);

  //   const provider = evmProviders.getProviderByChainId(ChainId.SEPOLIA)
  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, provider!);

  try {
    // Call the function on the contract to get the value
    const value = await contract.isOrderReviewed(orderId);
    console.log("is order reviewed:", value.toString());
    return value;
  } catch (error) {
    console.error("Error reading from contract:", error);
  }
};
export const isOrderPaid = async (orderId: string) => {
  // Connect to the Ethereum network (using Infura or Alchemy)
  const contractABI = [
    "function isOrderSettled(string calldata rawOrderId) external view returns (bool settled)",
  ];

  const provider = new ethers.JsonRpcProvider(`https://rpc2.sepolia.org`);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, provider!);

  try {
    // Call the function on the contract to get the value
    const value = await contract.isOrderSettled(orderId);
    console.log("is order paid:", value.toString());
    return value;
  } catch (error) {
    console.error("Error reading from contract:", error);
  }
};
