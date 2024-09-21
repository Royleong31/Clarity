// import { createPublicClient, http } from "viem";
// import { sepolia } from "viem/chains";
// import { Contract } from "ethers";
// import {
//   useEmbeddedWallet,
//   useUserWallets,
//   Wallet,
// } from "@dynamic-labs/sdk-react-core";
// import { isEthereumWallet } from "@dynamic-labs/ethereum";

// // Define your contract ABI (replace with your actual ABI)
// const contractABI = [
//   // Example function signature: function getValue() public view returns (uint256)
//   "function getValue() public view returns (uint256)",
// ];

// // Replace with your contract address
// const contractAddress = "0xYourContractAddressHere";

// // // Create a public client to interact with the Ethereum network
// // const client = createPublicClient({
// //     chain: sepolia,
// //     transport: http(),

// // });

// // Function to read data from the contract
// const readFromContract = async () => {
//   const userWallets = useUserWallets();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const embeddedWallet: Wallet<any> | undefined = userWallets.find(
//     (wallet) => wallet.connector?.isEmbeddedWallet === true
//   );

//   try {
//     if (!embeddedWallet) {
//       throw new Error("Embedded wallet not found");
//     }
//     if (!isEthereumWallet(embeddedWallet)) {
//       throw new Error("This wallet is not a Ethereum wallet");
//     }
//     const provider = await embeddedWallet.getWalletClient();
//     // Create an instance of the contract
//     const contract = new Contract(contractAddress, contractABI, provider);

//     // Call the function on the contract to get the value
//     const value = await contract.getValue();

//     console.log("Value from contract:", value.toString());
//   } catch (error) {
//     console.error("Error reading from contract:", error);
//   }
// };

// // Call the function
// readFromContract();

// import { createPublicClient, http, readContract } from 'viem';
// import { mainnet } from 'viem/chains';

// // Define your contract ABI (replace with your actual ABI)
// const contractABI = [
//     "function getValue() public view returns (uint256)",
// ];

// // Replace with your contract address
// const contractAddress = "0xYourContractAddressHere";

import { ethers } from "ethers";
import { useRpcProviders } from "@dynamic-labs/sdk-react-core";
import { evmProvidersSelector } from "@dynamic-labs/ethereum-core";
import { ChainId } from "@biconomy/core-types";

// Define your contract ABI (replace with your actual ABI)

// Replace with your contract address
const contractAddress = "0x1aa205ea73e9df203ad794f295b488ef97bfd434";

// Function to read data from the contract, returning a boolean

export const isOrderReviewed = async (orderId: string) => {
  // Connect to the Ethereum network (using Infura or Alchemy)
  const contractABI = [
    "function isOrderReviewed(string memory rawOrderId) external view returns (bool reviewed)",
  ];

  //   const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`);
  const provider = new ethers.JsonRpcProvider(`https://rpc2.sepolia.org`);
  //   const evmProviders = useRpcProviders(evmProvidersSelector);

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
