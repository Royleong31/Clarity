
import {
    Card,
    CardContent,
    CardDescription,

    CardHeader,
    CardTitle,
} from "../components/ui/card"

function FindMerchantCard() {
    return (
        <Card className="flex flex-col items-start self-stretch">
            <CardHeader>
                <CardTitle>Average Revenue</CardTitle>
                <CardDescription>View your shops's revenue</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Include any rating UI components here */}
                <div>4.5/5 Stars</div>
            </CardContent>
        </Card>
    )

}

export default FindMerchantCard