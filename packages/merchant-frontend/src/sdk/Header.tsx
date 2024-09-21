import pfp from "../assets/noun1.png";
import { XIcon } from "lucide-react";
import Logo from "../assets/black-logo.svg";

export default function Header() {
  return (
    <div className=" w-full flex items-center justify-between h-16">
      <img src={pfp} className="h-8 rounded-sm" />
      <div className="flex items-center font-bold text-lg">
        <img src={Logo} className="h-6 text-black mr-1" />
        Clarity
      </div>
      <XIcon />
    </div>
  );
}
