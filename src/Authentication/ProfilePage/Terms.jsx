import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function Terms() {
     const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white px-5 pt-6">

      {/* Top */}
      <div className="w-full flex items-center">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-1 text-center text-xl font-semibold">
          Terms & Condition
        </h1>
      </div>

      {/* Content */}
      <p className="mt-6 text-sm leading-6 text-gray-700">
       Welcome to Shower Share!
These Terms and Conditions ("Terms") govern your use of the Shower Share mobile application ("App") and the services offered through it. By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the App.<br></br>
1. Acceptance of Terms
By downloading, installing, or using the Shower Share App, you agree to these Terms, including any future modifications. We reserve the right to update or change these Terms at any time, and your continued use of the App after any changes will constitute your acceptance of the updated Terms.<br></br>
2. Description of the App
Shower Share is a mobile application that allows users to [describe the main function of the app, e.g., "share shower spaces, book available showers, track shower time, etc."].
The app may also provide additional features and services, which may be subject to additional terms and conditions.<br></br>
3. User Eligibility
To use the App, you must be at least [insert age requirement] years old or the legal age of majority in your jurisdiction. By using the App, you represent and warrant that you meet these requirements.<br></br>
4. User Accounts
Account Creation: To access certain features, you may be required to create an account. When you create an account, you agree to provide accurate, current, and complete information and to update it as necessary.
Account Security: You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. Notify us immediately if you suspect any unauthorized use of your account.
      </p>
    </div>
  );
}
