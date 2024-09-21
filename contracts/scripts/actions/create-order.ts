import {Contract} from 'ethers';
import hre, {ethers} from 'hardhat';

// Helpers
import {deploy, getContractAt, getTimestampInSeconds} from '../utils/helpers';
import {CLARITY_SEPOLIA} from '../utils/clarity';

async function main() {
  const [deployer, altAccount] = await hre.ethers.getSigners(); // Get signer object
  // const tokenPermit = await deploy<TokenPermit>(deployer, 'TokenPermit', [], false);
  const clarity = await getContractAt('Clarity', CLARITY_SEPOLIA);

  const TEST_UUID_STRING = 'd7c2bcca-b768-41c9-947e-2ac8c8b801dE';
  const TEST_UUID_STRING_2 = 'd7edee1b-1e05-4aca-86d9-ec10ac23289e';

  const tx1 = await clarity.createOrderForTransaction(TEST_UUID_STRING, 0, 1000, '0x');
  const receipt1 = await tx1.wait();
  console.log('Successfully created Mock Order 1:', receipt1);

  const tx2 = await clarity.createOrderForTransaction(TEST_UUID_STRING_2, 1, 1000, '0x');
  const receipt2 = await tx2.wait();
  console.log('Successfully created Mock Order 2:', receipt2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
