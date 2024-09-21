import RatingCard from '../admin-components/RatingCard';
import RevenueCard from '../admin-components/RevenueCard';
import AdminNavbar from '../admin-components/AdminNavbar';
import PastTransactionCard from '../admin-components/PastTransactionCard';

function AdminDashboard() {
    return (
        <div>
            <AdminNavbar />
            <div className="max-w-[720px] flex flex-col justify-center items-center min-w-[320px] md:min-w-[720px] w-full mx-auto p-4 pt-6">
                <h1 className="text-2xl font-bold">Store Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the Roy's Merchant dashboard where you can view all the trusted and attested transactions and rewviews on the shop</p>

                <div className="max-w-md flex flex-col space-y-4 mt-4 w-full min-w-[320px] md:min-w-[720px]">
                    <RevenueCard />
                    <RatingCard />
                    <PastTransactionCard />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
