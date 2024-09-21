import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLinkIcon,
  CircleAlertIcon,
  BadgeCheckIcon,
  Loader2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./Ratings";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import { useRootState } from "@/hooks/useRootState";
import { PaymasterMode } from "@biconomy/account";
import { useSmartWallet } from "@/hooks/useSmartWallet";

interface PaymentCompletedCardProps {
  onSuccess: () => void;
}

import axios from "axios";
import {
  encodeClarityReview,
  encodeWorldcoinProof,
  reviewTransaction,
} from "@/utils/contractFunctions";
import { root } from "viem/chains";

const PaymentCompletedCard: React.FC<PaymentCompletedCardProps> = ({
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const { rootState, setRootState } = useRootState();
  const smartWallet = useSmartWallet();
  const [loading, setLoading] = useState(false);

  const handleVerify = async (result: ISuccessResult) => {
    // TODO call backend to verify the proof
    console.log("verifying proof", result);
    setLoading(true);
    const res = await axios.get(
      import.meta.env.VITE_PUBLIC_CLARITY_API_URL +
        "/verify-world-id-proof?proof=" +
        result.proof +
        "&merkleRoot=" +
        result.merkle_root +
        "&nullifierHash=" +
        result.nullifier_hash
    );
    localStorage.setItem("nullifierHash", result.nullifier_hash);
    setRootState((prev) => ({
      ...prev,
      nullifierHash: result.nullifier_hash,
    }));
    console.log("proof verified", res);
  };

  const onWIDSuccess = async () => {
    // const onWIDSuccess = async (result: ISuccessResult) => {
    // console.log("proof verified, sending review", result);
    //TODO interact with contract to attest review
    const reviewData = encodeClarityReview(rating, comments);
    console.log("review data", reviewData);
    const encodedProof = encodeWorldcoinProof("test", "test", "test", "test");

    // const orderId = "8d96e941-4029-4ee2-8f0a-5bf7dfd4f4cc"
    const orderId = rootState.orderId;
    if (!orderId) {
      setLoading(false);
      throw new Error("Order ID not found");
    }

    const transaction = reviewTransaction(orderId, reviewData, encodedProof);

    console.log("review transaction", transaction);

    if (!smartWallet) {
      setLoading(false);
      throw new Error("Smart wallet not found");
    }
    const { wait, waitForTxHash } = await smartWallet.sendTransaction(
      transaction,
      {
        paymasterServiceData: {
          mode: PaymasterMode.SPONSORED,
        },
        simulationType: "validation_and_execution",
      }
    );
    console.log("sending txn 1");
    try {
      const { reason } = await wait();
      console.log("reason: ", reason);
      const { transactionHash } = await waitForTxHash();
      console.log(transactionHash);
      setRootState((prev) => ({
        ...prev,
        attestationId: "1234",
        isOrderReviewed: true,
        paymentTransactionHash: transactionHash,
      }));
      setLoading(false);
      onSuccess(); // Call the onSuccess prop function
    } catch (e) {
      console.error("Error sending transaction", e);
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col text-center items-center">
        <BadgeCheckIcon />
        <CardTitle>Payment Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="text-xs mb-2">Transaction Hash:</div>
        <a
          href={`https://sepolia.etherscan.io/tx/${rootState.paymentTransactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center w-full justify-between border border-black rounded-lg px-2 py-1"
        >
          <p className="text-ellipsis overflow-hidden">
            {rootState.paymentTransactionHash}{" "}
          </p>

          <ExternalLinkIcon className="w-4" />
        </a>
        <div className="text-xs text-grey-400 flex items-center mt-2">
          <CircleAlertIcon className="w-4 mr-1 inline-block " />
          Powered by Sign Protocol
        </div>
        <Separator className="my-4" />
        <div>
          <h1 className="text-sm">Your Rating:</h1>
          <StarRating rating={rating} setRating={setRating} />
          <form>
            <div className="grid w-full items-center gap-4 mt-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm" htmlFor="comments">
                  Comments:
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Include any additional thoughts!"
                  className="text-xs resize-none h-32"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
            <div className="text-xs text-grey-400 flex items-center mt-2">
              <CircleAlertIcon className="w-4 mr-1 inline-block " />
              Leaving a review earns you a Clarity Token.
            </div>
          </form>
          {/* <Button className="w-full mt-2" onClick={onWIDSuccess}>
            Verify with World ID
          </Button> */}
          <IDKitWidget
            app_id={import.meta.env.VITE_WID} // obtained from the Developer Portal
            action="review" // obtained from the Developer Portal
            onSuccess={onWIDSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Device}
          >
            {({ open }) => (
              // This is the button that will open the IDKit modal
              <Button className="w-full mt-2" onClick={open} disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Verify with World ID</>
                )}
              </Button>
            )}
          </IDKitWidget>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCompletedCard;
