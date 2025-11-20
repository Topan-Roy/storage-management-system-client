import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function ChangePassword() {
     const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white px-5 pt-6">

      {/* Top Bar */}
      <div className="w-full flex items-center">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-1 text-center text-xl font-semibold">
          Change Password
        </h1>
      </div>

      {/* Form */}
      <div className="mt-10 space-y-5">

        <div>
          <label className="text-gray-600 text-sm mb-1 block">Current Password</label>
          <input type="password"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm mb-1 block">New Password</label>
          <input type="password"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm mb-1 block">Confirm Password</label>
          <input type="password"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      {/* Save Button */}
      <button className="w-full bg-gray-900 text-white rounded-full py-3 mt-10">
        Save Change
      </button>
    </div>
  );
}
