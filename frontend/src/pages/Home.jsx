import { useEffect } from 'react';
import { useWebhook } from '../hooks/useWebhook';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
    const { hookId, loading } = useWebhook();
    const navigate = useNavigate();

    useEffect(() => {    
        navigate(`/v/${hookId}`, { replace: true });
    }, [hookId, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <Header darkMode={true} setDarkMode={() => {}} />
                <div className="flex items-center justify-center h-64">
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Header darkMode={true} setDarkMode={() => {}} />
            <div className="flex items-center justify-center h-64">
                <div className="text-xl">Redirecting to your webhook...</div>
            </div>
        </div>
    );
}

export default Home;