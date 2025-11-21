import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 4000); // 2 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center space-y-4">

                {/* পুরো div clickable করতে চাইলে এখানে onClick */}
                <div onClick={() => navigate('/onboarding')} className="cursor-pointer">

                    {/* Logo */}
                    <div className="w-20 h-20 flex items-center justify-center">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                            <path d="M8 16L16 8" strokeLinecap="round" />
                            <path d="M14 6L18 10" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-center">Jotter</h1>
                </div>
            </div>
        </div>
    );
};

export default Splash;
