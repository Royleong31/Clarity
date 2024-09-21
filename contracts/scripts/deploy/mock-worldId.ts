import hre from 'hardhat';

// Deployment Helpers:
import {deploy} from '../utils/helpers';
// ABI
import {WorldID} from '../../typechain-types';

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const mockWorldId = await deploy<WorldID>(deployer, 'WorldID', [], true);
  console.log('Mock WorldID Contract Deployed!');

  /*
  [SEPOLIA TESTNET]
  WorldID: 0xe6E854b5F1a474863791E537542A0546766f61c7
  https://sepolia.etherscan.io/address/0xe6E854b5F1a474863791E537542A0546766f61c7#code


  [BASE SEPOLIA TESTNET]
  WorldID: 0x593A46f5F1F43cf76bb7a279A22024530b88c3F7
  https://sepolia.basescan.org/address/0x593A46f5F1F43cf76bb7a279A22024530b88c3F7#code
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
