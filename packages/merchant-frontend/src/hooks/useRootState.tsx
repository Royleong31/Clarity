// Hook to use the smart wallet
import { useContext } from "react";
import { RootContext } from "../sdk/ClarityRootComponent";

export const useRootState = () => {
  const rootState = useContext(RootContext);
  if (!rootState) {
    throw new Error("Root state is not set");
  }
  return rootState
};
