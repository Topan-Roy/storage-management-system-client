import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useContext(AuthContext); // Firebase login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire("Error", "Please fill all fields", "error");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Firebase login
      const userCredential = await login(email, password);
      const uid = userCredential.user.uid;

      // 2️⃣ Optionally, check user from your server (MongoDB)
      const res = await axios.get(`http://localhost:3000/users/${uid}`);
      const userData = res.data;

      if (!userData) {
        Swal.fire({
          icon: "error",
          title: "User not found on server!",
        });
        setLoading(false);
        return;
      }

      // 3️⃣ Success alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // 4️⃣ Navigate to home/dashboard
      navigate("/homescreen");

    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        Swal.fire({
          icon: "error",
          title: "User not found!",
          text: "Please check your email or sign up.",
        });
      } else if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "error",
          title: "Wrong Password!",
          text: "Please try again.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: error.message,
        });
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await googleLogin();
      const uid = userCredential.user.uid;
      const email = userCredential.user.email;
      const username = userCredential.user.displayName;

      // Save/check user in server
      await axios.post("http://localhost:3000/users", {
        uid,
        email,
        username,
        role: "user",
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/homescreen");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="h-screen bg-white p-6 flex flex-col justify-between">
      <div className="mt-20 text-center">
        <h2 className="text-xl font-semibold">Continue Your Journey</h2>
        <p className="text-gray-600 mt-1">Let’s Sign In</p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 p-4 rounded-lg text-sm"
          />

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

          <Link to="/forgotpassword">
            <div className="text-right text-sm">
              <button type="button" className="underline text-gray-600">Forgot Password</button>
            </div>
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-4 rounded-full font-medium"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-sm">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border flex items-center justify-center space-x-2 py-4 rounded-full mb-10"
      >
        <span>🌐</span>
        <span>Sign In With Google</span>
      </button>
    </form>
  );
};

export default Login;
