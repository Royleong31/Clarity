import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLinkIcon,
  CircleAlertIcon,
  BadgeCheckIcon,
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

interface PaymentCompletedCardProps {
  onSuccess: () => void;
}

const PaymentCompletedCard: React.FC<PaymentCompletedCardProps> = ({
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const { setRootState } = useRootState();

  const handleVerify = (result: ISuccessResult) => {
    // TODO call backend to verify the proof
    console.log("verifying proof", result);
  };

  const onWIDSuccess = (result: ISuccessResult) => {
    console.log("proof verified, sending review", result);
    //TODO interact with contract to attest review
    setRootState((prev) => ({ ...prev, attestationId: "1234" }));

    onSuccess(); // Call the onSuccess prop function
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
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center w-full justify-between border border-black rounded-lg px-2 py-1"
        >
          0x2133423492489339430434 <ExternalLinkIcon className="w-4" />
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
          </form>
          <IDKitWidget
            app_id={import.meta.env.VITE_WID} // obtained from the Developer Portal
            action="review" // obtained from the Developer Portal
            onSuccess={onWIDSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Device}
          >
            {({ open }) => (
              // This is the button that will open the IDKit modal
              <Button className="w-full mt-2" onClick={open}>
                Verify with World ID
              </Button>
            )}
          </IDKitWidget>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCompletedCard;
