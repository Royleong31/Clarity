import hre from 'hardhat';

// Deployment Helpers:
import {deploy, getContractAt} from '../utils/helpers';
// ABI
import {Clarity, ClaritySPHook} from '../../typechain-types';
import {ZERO_ADDRESS} from '../utils/const';
import {CLARITY_SEPOLIA, CLARITY_SPHOOK_SEPOLIA, WORLD_ID_SEPOLIA} from '../utils/clarity';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('[DEPLOYER ADDRESS]:', deployer.address);
  // Sepolia
  const SIGN_PROTOCOL_SEPOLIA = '0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5';
  const USDC_SEPOLIA = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

  //   // Step 2: Create Clarity Review schema on Sign Protocol's SP Instance & invoke ClaritySPHook address
  const schema = {
    registrant: '0xe9ED15C9290d782268ba74A08999dba19ca367bE',
    revocable: false,
    dataLocation: 0,
    maxValidFor: 0,
    hook: '0x0000000000000000000000000000000000000000',
    timestamp: 0,
    data: JSON.stringify({
      name: 'review_test_1',
      description: 'review schema',
      data: [
        {name: 'ratings', type: 'uint256'},
        {name: 'comment', type: 'string'},
      ],
    }),
  };

  // Delegate signature (empty in this case)
  const delegateSignature = '0x';

  // Step 3: Deploy Clarity main contract
  const CLARITY_CONSTRUCTOR = [SIGN_PROTOCOL_SEPOLIA, CLARITY_SPHOOK_SEPOLIA, USDC_SEPOLIA, SIGN_PROTOCOL_SEPOLIA];
  const clarity = await deploy<Clarity>(deployer, 'Clarity', CLARITY_CONSTRUCTOR, true);
  console.log('Clarity Main Contract Deployed!');

  //   const clarity = await getContractAt<Clarity>('Clarity', CLARITY_SEPOLIA);

  const TEST_MERCHANT = '0xe9ED15C9290d782268ba74A08999dba19ca367bE';
  const TEST_MERCHANT_2 = '0x5C15Cf4ab0A650AE95B7109a5e3315EDAd68D5c0';

  // Register merchants:
  const tx = await clarity.registerMerchant(TEST_MERCHANT_2);
  const receipt = tx.wait();
  console.log(`Merchant 0 - ${TEST_MERCHANT} registered!`);

  const tx2 = await clarity.registerMerchant(TEST_MERCHANT_2);
  const receipt2 = tx2.wait();
  console.log(`Merchant 1 - ${TEST_MERCHANT_2} registered!`);

  // @TO_DO: Configure subgraph project manager.
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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
