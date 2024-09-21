import { CircleAlertIcon } from "lucide-react";

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

import axios from "axios";
import Header from "./Header";

export default function PaymentCard({ onSuccess }: { onSuccess: () => void }) {
  const [currency, setCurrency] =
    useState<keyof typeof currencyToAddress>("ETH");

  const [amount, setAmount] = useState(0);

  const currencyToAddress = {
    ETH: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    BTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    USDc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  };

  // const currencyToDecimals = {
  //   ETH: 18,
  //   BTC: 8,
  //   USDc: 6,
  // };

  async function httpCall() {
    const url = "https://api.1inch.dev/swap/v6.0/1/quote";

    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_1INCH_KEY}`,
      },
      params: {
        src: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        dst: currencyToAddress[currency],
        amount: "10000000000000000", // TODO change this to the value returned from the BE
      },
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      const response = await axios.get(url, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    httpCall();
    const interval = setInterval(() => {
      // Code to be executed every 30 seconds
      console.log("Fetching new quote");
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
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
                  onValueChange={(e) =>
                    setCurrency(e as keyof typeof currencyToAddress)
                  }
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="USDc">USDc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Pay (Maximum Amount)</Label>
                <div>
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
          <Button className="w-full">
            <img src={Logo} alt="logo" className="w-4 h-4 mr-2" />
            Pay with Clarity
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
