import React from 'react';
import { Link } from 'react-router';

const ForgotPassword = () => {
    return (
         <div className="h-screen bg-white p-6">
      
      <button className="text-xl mb-6">←</button>

      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">Forgot Your Password?</h2>
        <p className="text-gray-500 text-sm mt-2">
          Please enter your email to reset your password.
        </p>
      </div>

      <div className="mt-8">
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-100 p-4 rounded-lg text-sm"
        />
      </div>
        <Link to="/verifycode">
        <button className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium">
        Get Verification Code
      </button>
        </Link>
      
    </div>
    );
};

export default ForgotPassword;