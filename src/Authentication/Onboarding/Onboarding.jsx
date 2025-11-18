import React from 'react';
import { Link } from 'react-router';

const Onboarding = () => {
    return (
         <div className="h-screen bg-white flex flex-col justify-between p-6">
      <div className="mt-20 text-center">
        
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="4"></rect>
            <path d="M8 16L16 8" strokeLinecap="round"/>
            <path d="M14 6L18 10" strokeLinecap="round"/>
          </svg>
          <h1 className="text-3xl font-semibold">Jotter</h1>
        </div>

        <p className="mt-6 font-semibold text-gray-800 text-lg">
          Your Notes, Organized. Automatically
        </p>
        <p className="mt-3 text-gray-500 text-sm w-64 mx-auto">
          Save your screenshots, PDFs, and notes in one place. 
          Search effortlessly and find what you need in seconds.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-12">
        <Link to="/login" className="w-full">
        <button  className="w-full bg-black text-white py-4 rounded-full text-sm font-medium">
          Get Started for free
        </button>
        </Link>
        

        <p className="text-sm underline text-gray-700">Watch How It Works</p>
      </div>
    </div>
    );
};

export default Onboarding;