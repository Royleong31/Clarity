import handler from "@clarity/core/handler";

import { contract } from "src/contract";
import BigNumber from "bignumber.js";
import got from "got";

function generateUrlWithParams(
  baseUrl: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  // Create a URL object from the base URL

  let queryString = "?";
  const queryArr: string[] = [];

  // Iterate over the params object
  Object.entries(params).forEach(([key, value]) => {
    // Only add the parameter if the value is not null or undefined
    if (value !== null && value !== undefined) {
      queryArr.push(`${key}=${value.toString()}`);
    }
  });

  let finalString = baseUrl;
  if (queryArr.length > 0) {
    finalString += queryString + queryArr.join("&");
  }

  // Return the full URL as a string
  return finalString;
}

export const main = handler(
  async (request) => {
    const url = request.query.url;
    const queryObj = { ...request.query, url: undefined };
    const generatedUrl = generateUrlWithParams(url, queryObj);
    console.log("generatedUrl", generatedUrl);

    let response: any;
    try {
      response = await got.get(generatedUrl, {
        throwHttpErrors: false,
        headers: {
          ...request.headers,
          host: undefined,
        },
      });

      const rawResponseBody = response.body;
      console.log("raw response", rawResponseBody);
      console.log("returning");
      const parsedResponseBody = JSON.parse(rawResponseBody);
      return {
        statusCode: response.statusCode as any,
        body: parsedResponseBody,
        headers: {} as any,
      };
    } catch (error) {
      console.log("error");
      console.log(error);
      return {
        statusCode: response?.statusCode ?? (400 as any),
        body: response?.body,
        headers: response?.headers,
      };
    }
  },
  { schema: contract.getProxy }
);
