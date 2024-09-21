import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BadgeCheckIcon,
  ExternalLinkIcon,
  CircleAlertIcon,
} from "lucide-react";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { useRootState } from "@/hooks/useRootState";
import ConfettiExplosion from "react-confetti-explosion";

export default function ReviewCompletedCard() {
  const { rootState, setRootState } = useRootState();

  return (
    <>
      <Header />
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col text-center items-center">
          <BadgeCheckIcon />
          <ConfettiExplosion />
          <CardTitle>Review Attested!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs mb-2">Transaction Hash:</div>
          <a
            href={`https://sepolia.basescan.org/tx/${rootState.paymentTransactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center w-full justify-between border border-black rounded-lg px-2 py-1"
          >
            <p className="text-ellipsis overflow-hidden">
              {rootState.reviewTransactionHash}{" "}
            </p>
            <ExternalLinkIcon className="w-4" />
          </a>
          <div className="text-xs text-grey-400 flex items-center mt-2">
            <CircleAlertIcon className="w-4 mr-1 inline-block " />
            Powered by Sign Protocol
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => {
              setRootState((prev) => ({
                ...prev,
                orderId: undefined,
              }));
            }}
          >
            Back to shop
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
