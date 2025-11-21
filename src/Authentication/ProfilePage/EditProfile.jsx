import { useState, useEffect, useContext } from "react";
import { FiCamera, FiUser } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";

export default function EditProfile() {
  const { user } = useContext(AuthContext); // Firebase user
  const [name, setName] = useState(""); // Input value
  const [serverName, setServerName] = useState(""); // Server name
  const navigate = useNavigate();

  // Fetch user name from server
  useEffect(() => {
    if (user?.uid) {
      fetch(`https://storage-management-system-server.vercel.app/users/${user.uid}`) // আপনার server URL
        .then((res) => res.json())
        .then((data) => setServerName(data.user.username))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Swal.fire("Error", "Name cannot be empty", "error");
      return;
    }

    try {
      // 1️⃣ Update Firebase displayName
      await updateProfile(user, { displayName: name });

      // 2️⃣ Update server
      const res = await fetch(`https://storage-management-system-server.vercel.app/users/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Server error");

      Swal.fire("Success", "Name updated successfully", "success");
      navigate(-1); // Go back to previous page
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-5 pt-6">

      {/* Top Bar */}
      <div className="w-full flex items-center">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-1 text-center text-xl font-semibold">
          Edit Profile
        </h1>
      </div>

      {/* Profile Image */}
      <div className="relative mt-8">
        <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
          <FiUser className="text-gray-600" size={42} />
        </div>

        {/* Camera Icon Overlay */}
        <div className="absolute bottom-1 right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
          <FiCamera className="text-white" size={14} />
        </div>
      </div>

      {/* Input Field */}
      <div className="w-full mt-10">
        <label className="text-sm text-gray-500">User Name</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
          placeholder={serverName || "User"} // 🔹 Server name placeholder
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-gray-800 text-white rounded-full py-3 mt-14 text-lg"
      >
        Save Change
      </button>
    </div>
  );
}
