import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function Privacy() {
     const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen bg-white px-5 pt-6">

            <div className="w-full flex items-center">
                <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
                <h1 className="flex-1 text-center text-xl font-semibold">
                    Privacy Policy
                </h1>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-700">
                At Shower Share, we respect and protect your privacy. This Privacy Policy explains how we collect, use, store, and share information when you use our mobile application ("App") and related services ("Services"). By using the Shower Share App, you agree to the practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use the App
                We may collect the following types of information:
                Personal Information: When you create an account, we may collect your name, email address, phone number, and other details.
                Usage Data: Information on how you use the App, including IP address, device information, and usage patterns.
                Location Data: If you enable location services, we may collect location data to help you find available showers near you.
            </p>
        </div>
    );
}
