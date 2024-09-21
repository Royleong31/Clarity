import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../admin-components/AdminNavbar';
import MerchantApiCard from '../admin-components/MerchantApiCard';
import MerchantSignupCard from '../admin-components/MerchantSignupCard';
import { Button } from '../components/ui/button';

function AdminSignup() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/admin');
    };

    return (
        <>
            <AdminNavbar />
            <div className="flex flex-col justify-center items-center min-w-[320px] md:min-w-[720px] w-full mx-auto p-4 pt-6">
                <h1 className="text-2xl font-bold">Merchant Signup</h1>
                <p className="mt-2 text-gray-600">Hi Merchant! We would like to get to know you and your company better!</p>

                <div className="max-w-md flex flex-col space-y-4 mt-4 w-full min-w-[320px] md:min-w-[720px]">
                    <MerchantSignupCard />
                    <MerchantApiCard />
                    <Button onClick={handleSignUp}>Sign up</Button>
                </div>
            </div>
        </>
    );
}

export default AdminSignup;
