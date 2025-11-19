import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthProvider";

const Signup = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext); // Firebase createUser
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      Swal.fire("Error", "Please fill all fields", "error");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      setLoading(false);
      return;
    }

    if (!termsChecked) {
      Swal.fire("Error", "You must agree to Terms & Condition", "error");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Firebase Auth signup
      const userCredential = await createUser(email, password);

      // ✅ Firebase Auth user created
      const uid = userCredential.user.uid;

      // 2️⃣ Save extra user data to server (MongoDB)
      const response = await axios.post("http://localhost:3000/users", {
        uid,
        username,
        email,
        role: "user",
      });

      // ✅ Check MongoDB insert
      if (response.data?.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTermsChecked(false);

        // Navigate to login
        navigate("/homescreen");
      } else {
        Swal.fire({
          icon: "error",
          title: response.data?.message || "Registration Failed",
        });
      }
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Email already exists!",
          text: "Please use a different email or login.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server/Firebase Error!",
          text: error.message,
        });
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="h-screen bg-white p-6 flex flex-col justify-between">
      <div className="mt-14">
        <h2 className="text-center text-xl font-semibold">Create Your Account</h2>

        <div className="mt-8 space-y-4">
          {/* Username */}
          <div>
            <label className="text-xs text-gray-500">User Name</label>
            <input
              type="text"
              placeholder="Great"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-100 p-4 rounded-lg text-sm mt-1"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 p-4 rounded-lg text-sm"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 p-4 rounded-lg text-sm"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500 cursor-pointer"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-100 p-4 rounded-lg text-sm"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Terms & Condition */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <span>I have read & agreed to Jotter Terms & Condition</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
