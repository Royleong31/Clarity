import hre, {ethers} from 'hardhat';
import {deploy, getContractAt} from '../utils/helpers';

import {encodeClarityReview, encodeWorldcoinProof} from '../utils/sign';
import {
  SIGN_PROTOCOL_SEPOLIA,
  WORLD_ID_SEPOLIA,
  WORLD_ACTION_ID,
  WORLD_APP_ID,
  USDC_SEPOLIA,
  WORLD_ID_ARB_SEPOLIA,
  WORLD_ID_BASE_SEPOLIA,
  USDC_ARB_SEPOLIA,
  USDC_BASE_SEPOLIA,
  SIGN_PROTOCOL_ARB_SEPOLIA,
  SIGN_PROTOCOL_BASE_SEPOLIA,
  CLARITY_BASE_SEPOLIA,
} from '../utils/clarity';
import {MOCK_NULLIFIER_HASH, MOCK_PROOF, MOCK_ROOT, MOCK_SIGNAL} from '../utils/const';

// ABI
import {Clarity, ClaritySPHook, SP} from '../../typechain-types';

enum ClarityChains {
  SEPOLIA = 'SEPOLIA',
  ARB_SEPOLIA = 'ARB_SEPOLIA',
  BASE_SEPOLIA = 'BASE_SEPOLIA',
}
function getAddressLogs(chain: ClarityChains = ClarityChains.SEPOLIA) {
  let WORLD_ID_ADDRESS = '';
  let USDC = '';
  let SIGN_PROTOCOL_INSTANCE = '';
  const MOCK_1INCH_AGGREGATOR_V6_ADDRESS = '0xba7177535B4d9A74e7928376e8ecd9db8F689d12';

  if (chain === ClarityChains.SEPOLIA) {
    WORLD_ID_ADDRESS = WORLD_ID_SEPOLIA;
    USDC = USDC_SEPOLIA;
    SIGN_PROTOCOL_INSTANCE = SIGN_PROTOCOL_SEPOLIA;
  } else if (chain === ClarityChains.ARB_SEPOLIA) {
    WORLD_ID_ADDRESS = WORLD_ID_ARB_SEPOLIA;
    USDC = USDC_ARB_SEPOLIA;
    SIGN_PROTOCOL_INSTANCE = SIGN_PROTOCOL_ARB_SEPOLIA;
  } else {
    WORLD_ID_ADDRESS = WORLD_ID_BASE_SEPOLIA;
    USDC = USDC_BASE_SEPOLIA;
    SIGN_PROTOCOL_INSTANCE = SIGN_PROTOCOL_BASE_SEPOLIA;
  }

  return {
    worldIdAddress: WORLD_ID_ADDRESS,
    spHookConstructor: [WORLD_ID_ADDRESS, WORLD_APP_ID, WORLD_ACTION_ID],
    usdcAddress: USDC,
    spInstanceAddress: SIGN_PROTOCOL_INSTANCE,
    oneInchAggregatorV6Address: MOCK_1INCH_AGGREGATOR_V6_ADDRESS,
  };
}

async function main() {
  const [deployer, altAccount] = await hre.ethers.getSigners();
  const {worldIdAddress, spHookConstructor, usdcAddress, spInstanceAddress, oneInchAggregatorV6Address} =
    getAddressLogs(ClarityChains.BASE_SEPOLIA);

  //   // Step 1: Deploy ClaritySPHook to prepare for schema creation on Sign Protocol's SP Instance
  //   const claritySpHook = await deploy<ClaritySPHook>(deployer, 'ClaritySPHook', spHookConstructor, true);

  //   const TEST_UUID_STRING = '5f61c1da-9f31-420e-b7f6-6d7c4baf7362';
  //   //   console.log('Clarity Hook Deployed!');

  //   //  Step 2: Create Clarity Review schema on Sign Protocol's SP Instance & invoke ClaritySPHook address
  //   const schema = {
  //     registrant: deployer.address,
  //     revocable: false,
  //     dataLocation: 0,
  //     maxValidFor: 0,
  //     hook: claritySpHook.address,
  //     timestamp: 0,
  //     data: JSON.stringify({
  //       name: 'Clarity Sepolia',
  //       description:
  //         'An immutable schema for orders processed through the Clarity open-source system, ensuring that all transactions are verified and executed only by genuine human users via WorldID, preventing bot activity and enhancing trust and security.',
  //       data: [
  //         {name: 'ratings', type: 'uint256'},
  //         {name: 'comment', type: 'string'},
  //       ],
  //     }),
  //   };

  //   // Delegate signature (empty in this case)
  //   const delegateSignature = '0x';
  //   // Get Sign Protocol's Instance
  //   const spInstance = await getContractAt<SP>('SP', spInstanceAddress); // @ARB

  //   // Register schema on spInstance
  //   const tx = await spInstance.register(schema, delegateSignature);
  //   const receipt = await tx.wait();

  //   const schemaId = ethers.BigNumber.from(receipt.logs[0].data).toNumber();

  //   console.log('Successfully registered Schema Id:', schemaId);

  //   // Step 3: Deploy Clarity Main contract
  //   const CLARITY_CONSTRUCTOR = [
  //     schemaId,
  //     spInstanceAddress,
  //     claritySpHook.address,
  //     usdcAddress,
  //     oneInchAggregatorV6Address,
  //   ];

  const TEST_UUID_STRING = '60c6cbbe-32d9-44dd-82b7-1aea1fbbc772';

  const clarity = await getContractAt<Clarity>('Clarity', CLARITY_BASE_SEPOLIA);
  //   const clarity = await deploy<Clarity>(deployer, 'Clarity', CLARITY_CONSTRUCTOR, true);

  const TEST_MERCHANT = '0xe9ED15C9290d782268ba74A08999dba19ca367bE';
  const TEST_MERCHANT_2 = '0x5C15Cf4ab0A650AE95B7109a5e3315EDAd68D5c0';

  //   // Register merchants:
  //   const merchantRegisterTx1 = await clarity.registerMerchant(TEST_MERCHANT_2);
  //   const merchantRegisterReceipt1 = merchantRegisterTx1.wait();
  //   console.log(`Merchant 0 - ${TEST_MERCHANT} registered!`);

  //   const merchantRegisterTx2 = await clarity.registerMerchant(TEST_MERCHANT_2);
  //   const merchantRegisterReceipt2 = merchantRegisterTx2.wait();
  //   console.log(`Merchant 1 - ${TEST_MERCHANT_2} registered!`);

  //   // Create Order
  //   const tx1 = await clarity.createOrderForTransaction(TEST_UUID_STRING, 0, 1000, '0x');
  //   const receipt1 = await tx1.wait();
  //   console.log('Successfully created Mock Order 1:', receipt1);

  // PAYMENT TO ORDER
  const usdc = await getContractAt('ERC20', usdcAddress);

  console.log('Balance: ', await usdc.balanceOf(altAccount.address));
  const usdcApprovalTx = await usdc.connect(altAccount).approve(clarity.address, 100000000);
  const approvalReceipt = await usdcApprovalTx.wait();
  console.log('USDC Approval successful!');

  const paymentTx = await clarity.connect(altAccount).settlePaymentOnlyByBaseCurrency(TEST_UUID_STRING);
  const paymentReceipt = await paymentTx.wait();
  console.log('USDC Payment Successful!');

  // Attest Review to order
  const review = {
    ratings: 3,
    comment: 'Exceeded expectations! Truly impressive.',
  };

  const encodedReview = encodeClarityReview(review.ratings, review.comment);
  //   console.log('[ENCODED REVIEW]:', encodedReview);

  const encodedProof = encodeWorldcoinProof(MOCK_SIGNAL, MOCK_ROOT, MOCK_NULLIFIER_HASH, MOCK_PROOF);
  //   console.log('[ENCODED WORLDID PROOF]', encodedProof);
  // AltAccount was payee
  const attestTx = await clarity.connect(altAccount).attestReview(TEST_UUID_STRING, encodedReview, encodedProof);
  const attestReceipt = await attestTx.wait();
  console.log('Successfully attested to OrderId', TEST_UUID_STRING);
  /*
  ARBITRUM SEPOLIA

  HOOK: 0x2eDD11E4121325F8aEf1cea1bB18721Ab456C357
  https://sepolia.arbiscan.io/address/address/0x2eDD11E4121325F8aEf1cea1bB18721Ab456C357#code
  Schema Id: 0xf2
  Full Schema: onchain_evm_421614_0xf2

  CLARITY MAIN CONTRACT: 0xba7177535B4d9A74e7928376e8ecd9db8F689d12
  https://sepolia.arbiscan.io/address/address/0xba7177535B4d9A74e7928376e8ecd9db8F689d12#code
  

  Clarity Review Schema Test
  SchemaId: 0x24e
  FULL Schema ID: onchain_evm_11155111_0x24e
  https://testnet-scan.sign.global/schema/onchain_evm_11155111_0x24e

 Clarity MAIN Contract: 0x479eE4d9BF5109bF6d55211871BE775C2e95eE58
 https://sepolia.etherscan.io/address/0x479eE4d9BF5109bF6d55211871BE775C2e95eE58#code
  */

  /*
(FINAL SEPOLIA)
Clarity SP Hook: 0x3d19B632faD6Da763Ae6093CabBCA6bE75eB5013
https://sepolia.etherscan.io/address/0x3d19B632faD6Da763Ae6093CabBCA6bE75eB5013#code

  Clarity Review Schema Test
  SchemaId: 0x25D
  FULL Schema ID: onchain_evm_11155111_0x25D
  https://testnet-scan.sign.global/schema/onchain_evm_11155111_0x25D

   Clarity MAIN Contract: 0xD8ddF4B409c0CE730c1BE601cF7839Bec9446CdB
 https://sepolia.etherscan.io/address/0xD8ddF4B409c0CE730c1BE601cF7839Bec9446CdB#code
 */

  /*
(FINAL BASE SEPOLIA)
Clarity SP Hook: 0x8932eC030EB39dF9d5d824BCa3E68d05a0424ba6
https://sepolia.basescan.org/address/0x8932eC030EB39dF9d5d824BCa3E68d05a0424ba6#code

  Clarity Review Schema Test
  SchemaId: 0x25D
  FULL Schema ID: onchain_evm_11155111_0x2ed
  https://testnet-scan.sign.global/schema/onchain_evm_84532_0x2ed

   Clarity MAIN Contract: 0xf46e3b69cadE327915b7cE6da7AA64624303c83e
https://sepolia.basescan.org/address/0xf46e3b69cadE327915b7cE6da7AA64624303c83e#code

SUBGRAPH: https://api.studio.thegraph.com/query/46716/clarity-base-sepolia/version/latest
 */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
