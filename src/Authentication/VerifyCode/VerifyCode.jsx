import React, { useState } from 'react';
import { Link } from 'react-router';

const VerifyCode = () => {
     const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
      if (value === "" && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };
    return (
         <div className="h-full min-h-full p-6 bg-white">
      <button className="text-xl mb-6">←</button>

      <div className="text-center mt-6">
        <h2 className="text-xl font-semibold">Verification Code</h2>
        <p className="text-gray-500 text-sm mt-2">
          Please enter the 6-digit code sent to your email.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 mt-10">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-14 text-center bg-gray-100 rounded-xl text-xl font-semibold border focus:outline-none focus:ring-2 focus:ring-black"
          />
        ))}
      </div>
        <Link to="/resetpassword">
        <button className="mt-10 w-full bg-black text-white py-4 rounded-full font-medium">
        Verify
      </button>

        </Link>
      
      <p className="text-center mt-4 text-sm text-gray-600">
        Didn’t receive the code? <span className="underline">Resend</span>
      </p>
    </div>
    );
};

export default VerifyCode;