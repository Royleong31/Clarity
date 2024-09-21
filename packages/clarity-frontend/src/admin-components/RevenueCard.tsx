import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useMerchantQuery } from "../generated/graphql";

function RevenueCard() {
  const { data: merchantData } = useMerchantQuery({
    variables: { merchantId: "1.0" },
  });

  const data = merchantData?.merchant;

  return (
    <div className="flex gap-x-2">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-large">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="">
              <div className="text-2xl font-bold text-left">
                ${data?.revenue ? Number(data?.revenue / 1_000_000).toFixed(2) : ""}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-large">Number of reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="">
              <div className="text-2xl font-bold text-left">{data?.reviewedOrderCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-large">Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="">
              <div className="text-2xl font-bold text-left">{data?.completedOrderCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RevenueCard;
