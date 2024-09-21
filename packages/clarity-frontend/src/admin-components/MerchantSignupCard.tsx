
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

function MerchantSignupCard() {
    return (
        <Card>
            <CardHeader className="space-y-1 justify-start align-left">
                <CardTitle className="text-xl text-left">Create an account</CardTitle>
                <CardDescription className="text-left">
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label className="text-left" htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label className="text-left" htmlFor="merchantName">Merchant Name</Label>
                    <Input id="merchantName" type="merchantName" placeholder="Roy's Luxury Gold Shop" />
                </div>
                <div className="grid gap-2">
                    <Label className="text-left" htmlFor="walletAddress">Input Your Wallet Address</Label>
                    <Input id="walletAddress" type="walletAddress" />
                </div>
            </CardContent>
            {/* <CardFooter>
                <Button className="w-full">Create account</Button>
            </CardFooter> */}
        </Card>
    )

}

export default MerchantSignupCard