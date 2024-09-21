import RatingCard from "../admin-components/RatingCard";
import RevenueCard from "../admin-components/RevenueCard";
import AdminNavbar from "../admin-components/AdminNavbar";
import PastTransactionCard from "../admin-components/PastTransactionCard";
import { getReviews } from "../sign-protocol/getReviews";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getReviews();
      setReviews(res);
      
    };
    fetchReviews();
  }, []);

  function calculateAverage(data) {
    if (data.length === 0) return 0; // Return 0 if the array is empty
    let total = 0;
    console.log(data);
    data.forEach((el) => {
      total += el.ratings;
    });
    return total / data.length;
  }

  const averageRating = calculateAverage(reviews);

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-[720px] flex flex-col justify-center items-center min-w-[320px] md:min-w-[720px] w-full mx-auto p-4 pt-6">
        <h1 className="text-2xl font-bold">Store Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Roy's Merchant dashboard where you can view all the
          trusted and attested transactions and rewviews on the shop
        </p>

        <div className="max-w-md flex flex-col space-y-4 mt-4 w-full min-w-[320px] md:min-w-[720px]">
          <RevenueCard />
          <RatingCard rating={averageRating} />
          <PastTransactionCard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
