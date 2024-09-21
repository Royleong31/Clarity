import { clarityClient } from "../../../core/src/react-query/clarityClient";
import { merchantClient } from "../../../core/src/react-query/merchantClient";

export const Hello = () => {
  const clarityData = clarityClient.home.useQuery(["fasdfsad"]);
  const merchantData = merchantClient.home.useQuery(["fsadsf"]);
  console.log("clarity FE", merchantData.data?.body, clarityData.data?.body);

  return <h1>Hello From Clarity SDK</h1>;
};
