// Import ethers v6
import {ethers} from 'ethers';

// Define the ABI types and values to encode
const types = ['string', 'uint256', 'bool'];
const values = ['Hello World', 123, true];

// Encode the data
export function encodeData(types: string[], values: any[]): string {
  const encodedData = ethers.utils.defaultAbiCoder.encode(types, values);
  console.log('ABI Encoded Data:', encodedData);
  return encodedData;
}

export function encodeClarityReview(ratings: number, comment: string): string {
  const REVIEW_TYPES = ['uint256', 'string'];

  return ethers.utils.defaultAbiCoder.encode(REVIEW_TYPES, [ratings, comment]);
}

export function encodeWorldcoinProof(signal: string, root: string, nullifierHash: string, proof: string[]): string {
  if (proof.length !== 8) return '';

  const types = [
    'address', // signal
    'uint256', // root
    'uint256', // nullifierHash
    'uint256[8]', // proof
  ];

  return ethers.utils.defaultAbiCoder.encode(types, [signal, root, nullifierHash, proof]);
}
