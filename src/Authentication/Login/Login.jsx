import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
         <div className="h-screen bg-white p-6 flex flex-col justify-between">
      
      <div className="mt-20 text-center">
        <h2 className="text-xl font-semibold">Continue Your Journey</h2>
        <p className="text-gray-600 mt-1">Let’s Sign In</p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-4 rounded-lg text-sm"
          />
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 p-4 rounded-lg text-sm"
            />
            <span className="absolute right-4 top-4 text-gray-500">👁️</span>
          </div>

          <div className="text-right text-sm">
            <button className="underline text-gray-600">Forgot Password</button>
          </div>
        </div>

        <button className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium">
          Log In
        </button>

        <p className="mt-4 text-sm">
          Don’t have an account?  <Link to="/signup">Sign Up</Link> 
        </p>
      </div>

      <button className="w-full border flex items-center justify-center space-x-2 py-4 rounded-full mb-10">
        <span>🌐</span>
        <span>Sign Up With Google</span>
      </button>
    </div>
    );
};

export default Login;