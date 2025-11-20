import { Link, useNavigate } from "react-router";
import { FiArrowLeft, FiLock, FiFileText, FiShield, FiInfo, FiTrash2 } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function Settings() {
     const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white px-5 pt-6 flex flex-col">

      {/* Top Bar */}
      <div className="w-full flex items-center">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-1 text-center text-xl font-semibold">
          Settings
        </h1>
      </div>

      {/* Menu Items */}
      <div className="mt-8 space-y-4 ">

        <Link
          to="/changepassword"
          className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiLock size={18} />
            <span>Change Password</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link
          to="/terms"
          className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiFileText size={18} />
            <span>Terms & Conditions</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link
          to="/privacy"
          className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiShield size={18} />
            <span>Privacy Policy</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link
          to="/about"
          className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiInfo size={18} />
            <span>About Us</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

      </div>

      {/* Delete Button (push bottom) */}
      <div className="mt-auto mb-6">
        <div 
          className="w-full bg-red-50 px-4 py-3 rounded-lg flex items-center gap-3 text-red-600 select-none cursor-default"
        >
          <FiTrash2 />
          <span>Delete Account</span>
        </div>
      </div>

    </div>
  );
}
