import { ArrowUpRight } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useOrdersQuery } from "../generated/graphql";

interface TransactionProps {
  payee: string;
  profilePic: string;
  paymentHash: string;
  reviewHash: string;
  createdDate: string;
}

const getNounsImage = (addresses: string[]) => {
  const addressToImage: Record<string, string> = {};
  let imageIndex = 1;

  for (const address of addresses) {
    if (addressToImage[address]) {
      continue;
    }

    addressToImage[address] = `noun${Math.min(20, imageIndex++)}.png`;
  }

  return addressToImage;
};

const addressToEns: Record<string, string> = {
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "Unpaid",
  "0x8e9368e7800fc560a6fa686af07187e08da201e7": "matthew.ens",
};

function shortenEthereumAddress(
  address: string,
  startLength: number = 5,
  endLength: number = 3
): string {
  // Ensure startLength is at least 2 to include "0x"
  startLength = Math.max(2, startLength);
  // Ensure we're not trying to show more characters than the address contains
  if (startLength + endLength >= address.length) {
    return address;
  }

  // Shorten the address
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

const Transaction = ({
  payee,
  profilePic,
  paymentHash,
  reviewHash,
  createdDate,
}: TransactionProps) => {
  return (
    <TableRow>
      <TableCell>
        {/* <div className="flex flex-col items-start">
                                    <div className="flex flex-col items-center">
                                        <img className="h-12 w-auto" src={nounsimage1} alt="profileimage" />
                                        <div className="font-medium mt-2">kenneth.ens</div>
                                    </div>
                                </div> */}
        <div className="flex items-center">
          <img className="h-12 w-auto" src={`/images/nouns/${profilePic}`} alt="profileimage" />
          <div className="font-medium ml-2 flex justify-start">
            <a
              href={`https://sepolia.basescan.org/address/${payee}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-black ${
                payee !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                  ? "underline"
                  : "text-gray-500"
              } flex items-center`}
            >
              {addressToEns[payee] || shortenEthereumAddress(payee)}
              {payee !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" && (
                <ArrowUpRight className="h-6" />
              )}
            </a>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {new Date(+createdDate * 1000).toLocaleString()}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex flex-col justify-end ">
          {paymentHash ? (
            <div className="flex justify-end items-center">
              <>
                <strong>Payment: </strong>
                <a
                  href={`https://sepolia.basescan.org/tx/${paymentHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline flex items-center"
                >
                  {shortenEthereumAddress(paymentHash)}
                  <ArrowUpRight className="h-6" />
                </a>
              </>
            </div>
          ) : (
            <p>-</p>
          )}

          {reviewHash ? (
            <div className="flex justify-end items-center">
              <>
                <strong>Review: </strong>
                <a
                  href={`https://sepolia.basescan.org/tx/${reviewHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline flex items-center"
                >
                  {shortenEthereumAddress(reviewHash)}
                  <ArrowUpRight className="h-6" />
                </a>
              </>
            </div>
          ) : (
            <p>-</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

function PastTransactionCard() {
  const { data: ordersData } = useOrdersQuery();

  console.log(ordersData);
  const addresses = ordersData?.orders.map((order) => order.payee) ?? [];
  const nounsImages = getNounsImage(addresses);
  const ordersWithImages =
    ordersData?.orders.map((order) => ({
      ...order,
      profilePic: nounsImages[order.payee] ?? "nouns1.png",
    })) ?? [];
  const sortedOrders = ordersWithImages.sort((a, b) => +b.createdTimestamp - +a.createdTimestamp);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-column items-start">
        <div className="flex flex-row justify-between w-full items-center">
          <CardTitle className="text-lg font-large">Transaction History</CardTitle>
          <Button>Export CSV</Button>
        </div>

        <CardDescription className="text-lg font-large text-left">
          View and download all transactions on the blockchain for Auditing, Financing, and Investor
          Relations
        </CardDescription>
      </CardHeader>

      {/* <CardContent>
                <Tabs defaultValue="review">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="review">review</TabsTrigger>
                            <TabsTrigger value="transactions">transaction</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </CardContent> */}

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Customer</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-right">View Attestations</TableHead>
              <TableHead className="hidden xl:table-column">Status</TableHead>
              <TableHead className="hidden xl:table-column">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <Transaction
                key={order.id}
                createdDate={order.createdTimestamp}
                payee={order.payee}
                paymentHash={order.paymentTx?.id ?? ""}
                profilePic={order.profilePic}
                reviewHash={order.reviewTx?.id ?? ""}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PastTransactionCard;
