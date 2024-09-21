import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  BadgeCheckIcon,
  ExternalLinkIcon,
  CircleAlertIcon,
} from "lucide-react";

export default function ReviewCompletedCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col text-center items-center">
        <BadgeCheckIcon />
        <CardTitle>Review Attested!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs mb-2">Transaction Hash:</div>
        <a
          href="https://www.google.com"
          target="_blank"
          className="text-xs flex items-center w-full justify-between border border-black rounded-lg px-2 py-1"
        >
          0x2133423492489339430434 <ExternalLinkIcon className="w-4" />
        </a>
        <div className="text-xs text-grey-400 flex items-center mt-2">
          <CircleAlertIcon className="w-4 mr-1 inline-block " />
          Powered by Sign Protocol
        </div>
      </CardContent>
    </Card>
  );
}
