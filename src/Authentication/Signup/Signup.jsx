import React from 'react';
import { Link } from 'react-router';

const Signup = () => {
    return (
        <div className="h-screen bg-white p-6 flex flex-col justify-between">
      
      <div className="mt-14">
        <h2 className="text-center text-xl font-semibold">Create Your Account</h2>

        <div className="mt-8 space-y-4">
          {/* Username */}
          <div>
            <label className="text-xs text-gray-500">User Name</label>
            <input
              type="text"
              placeholder="Great"
              className="w-full bg-gray-100 p-4 rounded-lg text-sm mt-1"
            />
          </div>

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

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-gray-100 p-4 rounded-lg text-sm"
            />
            <span className="absolute right-4 top-4 text-gray-500">👁️</span>
          </div>

          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="w-4 h-4" />
            <span>I have read & agreed to Jotter Terms & Condition</span>
          </label>
        </div>

        <button className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium">
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login">Log In </Link> 
        </p>
      </div>

      <button className="w-full border flex items-center justify-center space-x-2 py-4 rounded-full mb-10">
        <span>🌐</span>
        <span>Sign Up With Google</span>
      </button>
    </div>
    );
};

export default Signup;