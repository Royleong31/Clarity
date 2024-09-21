import { CircleAlertIcon, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";

import { useFunding } from "@dynamic-labs/sdk-react-core";
import { useSmartWallet } from "@/hooks/useSmartWallet";

import {
  approve,
  settlePaymentOnlyByBaseCurrencyTransaction,
} from "../utils/contractFunctions";
import { useSendSponsoredTransaction, useUserOpWait } from "@biconomy/use-aa";
import { PaymasterMode } from "@biconomy/account";

export default function PaymentCard({ onSuccess }: { onSuccess: () => void }) {
  const [currency, setCurrency] =
    useState<keyof typeof currencyToAddress>("ETH");

  const [amount, setAmount] = useState(0);

  const { openFunding } = useFunding();

  const smartWallet = useSmartWallet();

  const {
    mutate,
    data: userOpResponse,
    error,
    isPending,
  } = useSendSponsoredTransaction();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);

  const currencyToAddress = {
    ETH: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    BTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    USDc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  };

  // const currencyToDecimals = {
  //   ETH: 18,
  //   BTC: 8,
  //   USDc: 6,
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      // Code to be executed every 30 seconds
      setAmount(10);
      console.log("Fetching new quote");
    }, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (waitData?.success === "true") {
      console.log(waitData?.receipt?.transactionHash);
    }
  }, [waitData]);
  const paymentHandler = async () => {
    console.log("paying");
    const tokenAddress = currencyToAddress[currency];
    const txn1 = approve(tokenAddress, 5);
    console.log('txn 1', txn1);
    const txn2 = settlePaymentOnlyByBaseCurrencyTransaction(
      "d7c2bcca-b768-41c9-947e-2ac8c8b801d1"
    );
    if (smartWallet) {
      console.log("wallet exists");
      const { waitForTxHash } = await smartWallet.sendTransaction(txn1, {
        paymasterServiceData: {
          mode: PaymasterMode.SPONSORED,
        },
        gasOffset: {
          verificationGasLimitOffsetPct: 25,
          preVerificationGasOffsetPct: 9.8,
        }
      });
      const { transactionHash } = await waitForTxHash();

      console.log(transactionHash);
    }
    // mutate({
    //   transactions: [txn1, txn2],
    // });
  };

  const handleOnRamp = async () => {
    await openFunding({
      token: "USDT",
      address: smartWallet?.accountAddress,
    });
  };

  return (
    <Card className="w-md">
      <CardHeader className="pb-2">
        <CardTitle>Make Payment</CardTitle>
        <CardDescription>Select your currency and network.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex justify-between w-full">
              <DynamicWidget />
            </div>

            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="framework">Pay With</Label>
              <Select defaultValue="ETH" onValueChange={(e) => setCurrency(e)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDc">USDc</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs flex justify-between">
                <div>Balance: 30{currency}</div>
                <div
                  className="text-blue-700 underline underline-offset-2 cursor-pointer"
                  onClick={handleOnRamp}
                >
                  Top Up
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Pay (Maximum Amount)</Label>
              <div className="w-full border border-slate-200 rounded-md text-sm p-2">
                {amount} {currency}
              </div>
            </div>
          </div>
        </form>
        <div className="text-xs text-grey-400 flex items-center mt-2">
          <CircleAlertIcon className="w-4 mr-1 inline-block " />
          Quote will refresh every 30s
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full"
          onClick={() => {
            paymentHandler();
          }}
        >
          <img src={Logo} alt="logo" className="w-4 h-4 mr-2" />
          {isPending || waitIsLoading ? "Loading..." : "Pay with Clarity"}
        </Button>
      </CardFooter>
    </Card>
  );
}
