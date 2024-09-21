import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import Logo from "../assets/logo.svg";
import { useRootState } from "@/hooks/useRootState";

import { v4 as uuidv4 } from "uuid";
import { merchantClient } from "../../../core/src/react-query/merchantClient";
export default function CheckoutCard() {
  const { setRootState } = useRootState();
  const { mutateAsync, isPending } = merchantClient.createOrder.useMutation();

  const handlePay = async () => {
    // Call the backend to create an order
    const cartId = uuidv4();
    console.log(cartId);
    const response = await mutateAsync({ body: { cartId } });
    console.log(response.body.id);

    setRootState((prev) => ({
      ...prev,
      orderId: response.body.id,
    }));
  };
  return (
    <Card className="w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-sm font-bold">Order Details</h3>
        <div className="flex justify-between">
          <span>Chicken Rice</span>
          <span>$10</span>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$12</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>$12</span>
        </div>
        <Separator className="my-4" />
        <h3 className="text-sm font-bold">Payment Method</h3>
        <div className="text-xs">
          Clarity lets you pay with any major crypto currencies: BTC, ETH, USDc
          on any chain!
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full flex items-center"
          onClick={handlePay}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
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
