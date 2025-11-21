import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import { BottomNav, NavItem } from '../../Page/HomeScreen/HomeScreen';
import { AuthContext } from '../../Contexts/AuthProvider';

const ProfilePage = () => {

  const { logOut,user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out"
    }).then((result) => {
      if (result.isConfirmed) {

        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonColor: "#000"
            });

            // 🔥 Redirect to Login page
            navigate("/login"); 
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });

      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10">

      {/* Avatar */}
      <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"></path>
        </svg>
      </div>

      {/* User Name */}
      <h2 className="text-lg font-semibold mt-4"> {user?.displayName || user?.email || "User"}</h2>

      {/* Options */}
      <div className="w-full px-6 mt-6 space-y-3 space-x-1">
        <Link to="/editprofile">
        <OptionItem icon="👤" label="Edit Profile" />
        </Link>
         <Link to="/settings">
         <OptionItem icon="⚙️" label="Settings" />
         </Link>
        <Link to="/support">
        <OptionItem icon="🎧" label="Support" />
        </Link>
        
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-[85%] bg-gray-900 text-white py-3 rounded-lg mt-10 flex items-center justify-center space-x-2"
      >
        <span className="text-lg">↳</span>
        <span>Log Out</span>
      </button>

    </div>
  );
}

function OptionItem({ icon, label }) {
  return (
    <div className="bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-3 text-gray-700">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-gray-500">›</span>

      {/* আপনার মতোই */}
      <NavItem />
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
