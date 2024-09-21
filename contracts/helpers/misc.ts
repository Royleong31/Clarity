import { BigNumberish, BigNumber, ethers } from "ethers";

export function unhexify(hexString: string): BigNumberish {
    return ethers.BigNumber.from(hexString);
}

export  function toWei(amount: number, decimal: number) {
    return BigNumber.from(10).pow(decimal).mul(amount);
  }