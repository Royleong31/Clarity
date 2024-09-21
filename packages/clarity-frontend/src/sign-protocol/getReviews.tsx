import axios from "axios";
import { ethers } from "ethers";

const SIGN_PROTOCOL_TESTNET_URL_PREFIX = "https://testnet-rpc.sign.global/api";

export async function getReviews() {
  const API_URL = `${SIGN_PROTOCOL_TESTNET_URL_PREFIX}/index/attestations?schemaId=onchain_evm_11155111_0x25D`;

  const res = await axios.get(API_URL);
  // const { ratings, comment } = decodeClarityReview(
  //   res.data.data.rows[0].data
  // );
  // console.log(ratings, comment);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reviews: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.data.data.rows.forEach((row: any) => {
    try {
      const { ratings, comment } = decodeClarityReview(row.data);
      reviews.push({ ratings, comment });
    } catch (_) {
      console.error("Failed to decode review", row.data);
    }
  });
  return reviews;
}

/**
 * Decodes the encoded clarity review string back to its original ratings and comment.
 * @param {string} encodedReview - The encoded string to decode.
 * @returns {{ ratings: number, comment: string }} - An object containing the ratings and comment.
 */
function decodeClarityReview(encodedReview: string) {
  const REVIEW_TYPES = ["uint256", "string"];

  // Decode the encoded review
  const [ratings, comment] = ethers.utils.defaultAbiCoder.decode(
    REVIEW_TYPES,
    encodedReview
  );

  return {
    ratings: ratings.toNumber(), // Convert BigNumber to number
    comment: comment,
  };
}
