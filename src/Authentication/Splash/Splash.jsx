import React from 'react';
import { Link } from 'react-router';

const Splash = () => {
    return (

        <div className="h-screen bo flex flex-col items-center justify-center bg-white">
            <div  className="flex flex-col items-center space-y-4">
                <Link to="/onboarding">
                {/* Logo */}
                <div className="w-20 h-20 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                        <path d="M8 16L16 8" strokeLinecap="round" />
                        <path d="M14 6L18 10" strokeLinecap="round" />
                    </svg>
                </div>

                <h1 className="text-2xl font-semibold">Jotter</h1>
                </Link>
            </div>
        </div>
    );
};

export default Splash;