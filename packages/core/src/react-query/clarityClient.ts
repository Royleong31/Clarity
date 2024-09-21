/* eslint-disable @typescript-eslint/no-explicit-any */
import { initQueryClient } from "@ts-rest/react-query";
import { contract as clarityContract } from "../../../clarity-backend/src/contract";
import cloneDeep from "lodash/cloneDeep";
import { QueryClient } from "@tanstack/react-query";

const deepCloneContract = cloneDeep(clarityContract);

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

export const clarityClient = initQueryClient(modifyPathParams(deepCloneContract) as typeof clarityContract, {
  baseUrl: import.meta.env.VITE_PUBLIC_CLARITY_API_URL,
  baseHeaders: {},
});

export const clarityQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
