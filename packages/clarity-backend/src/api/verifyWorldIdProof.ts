import handler from "@clarity/core/handler";

import { Resource } from "sst";
import { db } from "@clarity/core/database/client";
import { contract } from "src/contract";
import { createOrderInContract, verifyOrderPayment } from "src/ethers/contract";
import BigNumber from "bignumber.js";
import { encodeBytes32String, toUtf8Bytes, hexlify } from "ethers";
import { type IVerifyResponse, VerificationLevel, verifyCloudProof } from "@worldcoin/idkit";

const APP_ID = "app_staging_57b55b1f332cf968ff3c27b3616e681e";
const ACTION_ID = "review";
export const main = handler(
  async (request) => {
    const { proof, merkleRoot, nullifierHash } = request.query;
    const verifyRes = (await verifyCloudProof(
      {
        proof,
        nullifier_hash: nullifierHash,
        merkle_root: merkleRoot,
        verification_level: VerificationLevel.Device,
      },
      APP_ID,
      ACTION_ID
    )) as IVerifyResponse;

    return {
      statusCode: 200 as const,
      body: verifyRes.success,
    };
  },
  { schema: contract.verifyWorldIdProof }
);
