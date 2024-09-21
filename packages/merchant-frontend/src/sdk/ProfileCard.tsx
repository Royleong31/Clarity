import Header from "./Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ApertureIcon,
  RocketIcon,
} from "lucide-react";

export default function ProfileCard() {
  return (
    <>
      <Header />
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col text-center items-center">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs mb-2">Clarity Balance:</div>
          <div className="font-bold flex items-center w-full justify-between border border-black rounded-lg px-2 py-1">
            123
            <ApertureIcon className="w-4 mr-1 inline-block " />
          </div>
          <div className="text-xs text-grey-400 flex items-center mt-2">
            <RocketIcon className="w-4 mr-1 inline-block " />
            Earn more Clarity to boost your social capital!
          </div>
        </CardContent>
      </Card>
    </>
  );
}
