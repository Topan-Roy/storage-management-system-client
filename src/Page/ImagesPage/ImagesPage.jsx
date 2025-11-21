import { useState, useEffect, useContext } from "react";
import { HiOutlineChevronLeft, HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegFileImage } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useNavigate } from "react-router";

export default function ImagePage() {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) return;

    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://storage-management-system-server.vercel.app/images/${email}`);
        setImages(res.data);
      } catch (err) {
        console.error("Fetch images failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [email]);

  return (
    <div className="w-full h-screen bg-white px-5 py-4 relative">

      {/* Header */}
      <div className="flex items-center space-x-3 mb-5">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold">Images</h1>
      </div>

      {/* Search Box */}
      <div className="w-full mb-5">
        <input
          type="text"
          placeholder="Search Images..."
          className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none"
        />
      </div>

      {/* Images List */}
      <div className="space-y-5">
        {loading ? (
          <p className="text-gray-500">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-500">No images found.</p>
        ) : (
          images.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg">
                  <FaRegFileImage />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>

              <HiOutlineDotsVertical className="text-xl text-gray-600 cursor-pointer" />
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button className="absolute right-6 bottom-8 bg-gray-100 shadow-md w-14 h-14 rounded-full flex items-center justify-center text-3xl">
        +
      </button>
    </div>
  );
}
