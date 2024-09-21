// Hook to use the smart wallet
import { useContext } from "react";
import { SmartWalletContext } from "../sdk/providers/WalletProvider";

export const useSmartWallet = () => {
  return useContext(SmartWalletContext);
};
