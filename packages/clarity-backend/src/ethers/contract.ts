import {
  Contract,
  Wallet,
  JsonRpcProvider,
  encodeBytes32String,
  toUtf8Bytes,
  hexlify,
} from "ethers";
import { Resource } from "sst";
import { abi } from "./abi";
import BigNumber from "bignumber.js";

function stringToBytes32(source: string) {
  // Convert the string to a Uint8Array (array of bytes)
  let bytes = toUtf8Bytes(source);

  if (bytes.length > 32) {
    // If the input is longer than 32 bytes, truncate it
    bytes = bytes.slice(0, 32);
  }

  // Create a bytes32 array filled with zeros
  let bytes32 = new Uint8Array(32);
  bytes32.set(bytes);

  // Convert the byte array to a hex string and pad it to 32 bytes
  return hexlify(bytes32);
}

const provider = new JsonRpcProvider(
  `https://arbitrum-sepolia.infura.io/v3/${Resource.InfuraApiKey.value}`
);

const wallet = new Wallet(Resource.PrivateKey.value, provider);
export const contract = new Contract(Resource.ContractAddress.value, abi, wallet);

export const createOrderInContract = async (
  orderId: string,
  merchantId: number,
  amount: BigNumber
) => {
  const tx = await contract.createOrderForTransaction(
    orderId,
    merchantId,
    amount.multipliedBy(BigNumber(10).pow(6)).toString(), // USDC has 6 decimals
    "0x"
  );
  console.log("before waiting");
  const orderCreation = await tx.wait();
  console.log("after waiting");

  return {
    to: orderCreation.to,
    from: orderCreation.from,
    transactionHash: orderCreation.hash,
    blockHash: orderCreation.blockHash,
  };
};

export const verifyOrderPayment = async (orderId: string) => {
  const response = await contract.orderRegistry(stringToBytes32(orderId));

  const amount = Number(response[0]);
  const merchantId = Number(response[1]);
  const payee = response[2] as string;
  const reviewAttestationId = Number(response[3]);
  const isPaid = response[4] as boolean;

  return { amount, merchantId, payee, reviewAttestationId, isPaid };
};
