import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { createOrderInContract, verifyOrderPayment } from "src/ethers/contract";
import BigNumber from "bignumber.js";
import { encodeBytes32String, toUtf8Bytes, hexlify } from "ethers";

const schema = contract.home;

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

export const main = handler(
  async (request) => {
    // await createOrderInContract("6a696a1c-090d-48d6-b2d7-d1c4ee53e81d", 1, BigNumber(1));

    
    return {
      statusCode: 200 as const,
      body: {
        body: "Hello from clarity backend. Number of orders found: ",
      },
    };
  },
  { schema }
);
