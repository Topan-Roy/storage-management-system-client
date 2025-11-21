import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";
import { Link, useNavigate } from "react-router";
import { FiLock, FiFileText, FiShield, FiInfo, FiTrash2 } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function Settings() {
  const navigate = useNavigate();
  const { user, deleteAccount, logOut } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Delete Account?",
      text: "Your account and all data will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 1️⃣ Delete from server
          await fetch(`https://storage-management-system-server.vercel.app/users/${user.email}`, {
            method: "DELETE"
          });

          // 2️⃣ Delete from Firebase
          await deleteAccount();

          Swal.fire({
            title: "Deleted!",
            text: "Your account and all data have been removed.",
            icon: "success",
            confirmButtonColor: "#000"
          });

          logOut();
          navigate("/login");

        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: error.message,
          });
        }
      }
    });
  };

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
        <Link to="/changepassword" className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <FiLock size={18} />
            <span>Change Password</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link to="/terms" className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <FiFileText size={18} />
            <span>Terms & Conditions</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link to="/privacy" className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <FiShield size={18} />
            <span>Privacy Policy</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>

        <Link to="/about" className="w-full bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-700">
            <FiInfo size={18} />
            <span>About Us</span>
          </div>
          <span className="text-gray-400">{'>'}</span>
        </Link>
      </div>

      {/* Delete Button */}
      <div className="mt-65 mb-5">
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-50 px-4 py-3 rounded-lg flex items-center gap-3 text-red-600 select-none cursor-pointer"
        >
          <FiTrash2 />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
}
