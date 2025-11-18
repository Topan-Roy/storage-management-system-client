import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      Swal.fire("Error", "Please enter your email", "error");
      return;
    }

    try {
      // 1️⃣ Firebase password reset email
      await resetPassword(email);

      // 2️⃣ Save email in sessionStorage for next step
      sessionStorage.setItem("resetEmail", email);

      Swal.fire(
        "OTP Sent!",
        "Please check your email for the verification code",
        "success"
      );

      navigate("/verifycode");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-100 p-4 rounded-lg text-sm"
        />
      </div>

      <button
        onClick={handleSendOTP}
        className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium"
      >
        Get Verification Code
      </button>
    </div>
  );
};

export default ForgotPassword;
