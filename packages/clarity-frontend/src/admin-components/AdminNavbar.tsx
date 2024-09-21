import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import clarityImage from '../images/Clarity.svg';
import { LogOut } from 'lucide-react';



function AdminNavbar() {
    const navigate = useNavigate();
    const location = useLocation()
    const inSignupPage = location.pathname.endsWith('/adminsignup');

    return (
        <nav className="bg-slate-100 p-4 flex justify-between items-center">
            <div className='max-w-[720px] flex flex-row justify-center items-center min-w-[320px] md:min-w-[720px] w-full mx-auto'>
                <img src={clarityImage} alt="Clarity Logo" className="h-8" />
                <div className="w-full max-w-[720px] flex justify-end">
                    {inSignupPage ? <div /> : <Button className="flex items-center" onClick={() => navigate('/adminsignup')}>
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Button>}
                </div>
            </div>
        </nav>

    );
}

export default AdminNavbar;
