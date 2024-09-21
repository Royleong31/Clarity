import hre, {ethers} from 'hardhat';

// Deployment Helpers:
import {deploy, getContractAt} from '../utils/helpers';
// ABI
import {Clarity, ClaritySPHook, SP} from '../../typechain-types';
import {ZERO_ADDRESS} from '../utils/const';
import {WORLD_ID_SEPOLIA, WORLD_ACTION_ID, WORLD_APP_ID, SIGN_PROTOCOL_SEPOLIA} from '../utils/clarity';

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Sepolia
  const WORLD_ID_ADDRESS = WORLD_ID_SEPOLIA; // To run deploy mock WorldID contract and store it write here

  // Step 1: Deploy ClaritySPHook to prepare for schema creation on Sign Protocol's SP Instance
  const CLARITY_SP_HOOK_CONSTRUCTOR = [WORLD_ID_ADDRESS, WORLD_APP_ID, WORLD_ACTION_ID];
  const claritySpHook = await deploy<ClaritySPHook>(deployer, 'ClaritySPHook', CLARITY_SP_HOOK_CONSTRUCTOR, true);

  console.log('Clarity Hook Deployed!');

  // Step 2: Create Schema on Sign Protocol Instance
  //   // Step 2: Create Clarity Review schema on Sign Protocol's SP Instance & invoke ClaritySPHook address
  const schema = {
    registrant: deployer.address,
    revocable: false,
    dataLocation: 0,
    maxValidFor: 0,
    hook: claritySpHook.address,
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

  // Get Sign Protocol's Instance
  const spInstance = await getContractAt<SP>('SP', SIGN_PROTOCOL_SEPOLIA);

  // Register schema on spInstance
  const tx = await spInstance.register(schema, delegateSignature);
  const receipt = await tx.wait();

  const schemaId = ethers.BigNumber.from(receipt.logs[0].data).toNumber();

  console.log('Successfully registered Schema Id:', schemaId);

  /*
    0x586B5D5C9E715963F848EE7b20297D14f6746f53
    Schema: onchain_evm_11155111_0x24e

     0x586B5D5C9E715963F848EE7b20297D14f6746f53
    Schema: onchain_evm_11155111_0x257
    599
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
