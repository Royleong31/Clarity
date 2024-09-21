import {Contract} from 'ethers';
import hre, {ethers} from 'hardhat';

// Helpers
import {deploy, getContractAt, getTimestampInSeconds} from '../utils/helpers';
import {CLARITY_SEPOLIA, USDC_SEPOLIA} from '../utils/clarity';

async function main() {
  const [deployer, altAccount] = await hre.ethers.getSigners(); // Get signer object

  // Get Contracts
  const clarity = await getContractAt('Clarity', CLARITY_SEPOLIA);
  const usdc = await getContractAt('ERC20', USDC_SEPOLIA);

  const TEST_UUID_STRING = 'd7c2bcca-b768-41c9-947e-2ac8c8b801dE';
  //   const TEST_UUID_STRING = '8d96e941-4029-4ee2-8f0a-5bf7dfd4f4cc';
  const TEST_UUID_STRING_2 = 'd7edee1b-1e05-4aca-86d9-ec10ac23289e';

  console.log('[ALT ACCOUNT ADDRESS]:', altAccount.address);
  console.log('Balance: ', await usdc.balanceOf(altAccount.address));
  const usdcApprovalTx = await usdc.connect(altAccount).approve(clarity.address, 100000000);
  const approvalReceipt = await usdcApprovalTx.wait();

  console.log('USDC Approval successful!');
  // 0x67BAB5762f03D184018d8f0978fa84117c41Bb2f
  const paymentTx = await clarity.connect(altAccount).settlePaymentOnlyByBaseCurrency(TEST_UUID_STRING);
  const paymentReceipt = await paymentTx.wait();

  console.log('USDC Payment Successful!');
  //   const TEST_UUID_STRING = 'd7c2bcca-b768-41c9-947e-2ac8c8b801db';

  //   const tx = await clarity.createOrderForTransaction(TEST_UUID_STRING, 0, 10000000, '0x');
  //   const receipt = await tx.wait();
  //   console.log('Successfully created mock order:', receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
