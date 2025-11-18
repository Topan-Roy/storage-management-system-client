import React, { useState } from 'react';

const ResetPassword = () => {
     const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="h-full min-h-full p-6 bg-white">
      <button className="text-xl mb-6">←</button>

      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <p className="text-gray-500 text-sm mt-2">
          Enter your new password below.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 p-4 rounded-lg text-sm"
          />
          <span
            className="absolute right-4 top-4 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-gray-100 p-4 rounded-lg text-sm"
          />
          <span
            className="absolute right-4 top-4 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>
      </div>

      <button className="mt-10 w-full bg-black text-white py-4 rounded-full font-medium">
        Reset Password
      </button>
    </div>
    );
};

export default ResetPassword;