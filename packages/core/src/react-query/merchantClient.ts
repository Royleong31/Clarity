/* eslint-disable @typescript-eslint/no-explicit-any */
import { initQueryClient } from "@ts-rest/react-query";
import { contract as merchantContract } from "../../../merchant-backend/src/contract";
import cloneDeep from "lodash/cloneDeep";
import { QueryClient } from "@tanstack/react-query";

const deepCloneContract = cloneDeep(merchantContract);

function modifyPathParams(contractToBeModified: any) {
  Object.values(contractToBeModified).forEach((value: any) => {
    if (value.path) {
      value.path = value.path.replace("{", ":").replace("}", "");
    } else {
      modifyPathParams(value);
    }
  });

  return contractToBeModified;
}

export const merchantClient = initQueryClient(modifyPathParams(deepCloneContract) as typeof merchantContract, {
  baseUrl: import.meta.env.VITE_PUBLIC_MERCHANT_API_URL,
  baseHeaders: {},
});

export const merchantQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
