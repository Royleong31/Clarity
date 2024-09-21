import { CircleAlertIcon, Loader2 } from "lucide-react";

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
import { PaymasterMode } from "@biconomy/account";

import { getPrice } from "@/utils/1inchCalls";
import { Skeleton } from "@/components/ui/skeleton";
import { useRootState } from "@/hooks/useRootState";

import { clarityClient } from "../../../core/src/react-query/clarityClient";

export default function PaymentCard({ onSuccess }: { onSuccess: () => void }) {
  const { mutateAsync } = clarityClient.confirmOrderPayment.useMutation();
  const { rootState } = useRootState();
  const [currency, setCurrency] =
    useState<keyof typeof currencyToAddress>("ETH");

  const [amount, setAmount] = useState(0);

  const { openFunding } = useFunding();

  const smartWallet = useSmartWallet();

  const [balance, setBalance] = useState("0");
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [loading, setLoading] = useState(false);

  const currencyToAddress = {
    ETH: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  };

  const currencyToDecimals = {
    ETH: 12,
    USDC: 6,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getQuote();
    }, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("fetching new quote");
    getBalance();
    getQuote();
  }, [currency]);

  const [fetchingBalance, setFetchingBalance] = useState(false);

  const getBalance = async () => {
    setFetchingBalance(true);
    if (smartWallet) {
      // console.log(balances[0].formattedAmount);

      if (currency === "ETH") {
        const balances = await smartWallet.getBalances([]);
        console.log(balances[0].formattedAmount);
        setBalance(balances[0].formattedAmount);
        // setBalance(balances);
      } else {
        const balances = await smartWallet.getBalances([
          currencyToAddress[currency],
        ]);
        console.log(balances);
        setBalance(balances[0].formattedAmount);
      }
    }
    setFetchingBalance(false);
  };

  const paymentHandler = async () => {
    console.log("paying");
    setLoading(true);
    const tokenAddress = currencyToAddress[currency];
    const txn1 = approve(tokenAddress, 1000000000);
    console.log("txn 1", txn1);
    const orderId = rootState.orderId;

    if (!orderId) {
      setLoading(false);
      return;
    }
    const txn2 = settlePaymentOnlyByBaseCurrencyTransaction(orderId);
    console.log("txn 2", txn2);
    if (smartWallet) {
      console.log("wallet exists");

      const { wait, waitForTxHash } = await smartWallet.sendTransaction(
        [txn1, txn2],
        {
          paymasterServiceData: {
            mode: PaymasterMode.SPONSORED,
          },
          simulationType: "validation_and_execution",
        }
      );
      console.log("sending txn 1");
      const { reason } = await wait();
      console.log("reason: ", reason);
      const { transactionHash } = await waitForTxHash();
      console.log(transactionHash);
      await mutateAsync({ body: { orderId } });
      setLoading(false);
      onSuccess();
    }
  };

  const handleOnRamp = async () => {
    await openFunding({
      token: "USDT",
      address: await smartWallet?.getAccountAddress(),
    });
  };

  const getQuote = async () => {
    let price;
    setFetchingQuote(true);
    if (currency === "USDC") {
      setAmount(10);
    } else {
      price = await getPrice(currencyToAddress[currency], 10);
      setAmount(price / 10 ** currencyToDecimals[currency]);
    }
    setFetchingQuote(false);
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
              <Select
                defaultValue="ETH"
                onValueChange={(e: "ETH" | "USDC") => setCurrency(e)}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs flex justify-between">
                {fetchingBalance ? (
                  <Skeleton className="h-4 w-[60px]" />
                ) : (
                  <div>
                    Balance: {balance} {currency}
                  </div>
                )}
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
                {fetchingQuote ? (
                  <Skeleton className="h-4 w-[60px]" />
                ) : (
                  <span>
                    {amount} {currency}
                  </span>
                )}
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
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Paying...
            </>
          ) : (
            <>
              <img src={Logo} alt="logo" className="w-4 h-4 mr-2" />
              Pay with Clarity
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
