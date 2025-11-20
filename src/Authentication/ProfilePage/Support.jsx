import { FiArrowLeft, FiPhone, FiMail } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function Support() {
     const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white px-5 pt-6 text-center">

      {/* Top */}
      <div className="w-full flex items-center">
        <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="flex-1 text-center text-xl font-semibold">
          Support
        </h1>
      </div>

      {/* Illustration */}
      <div className="mt-16">
        <img 
          src="https://i.ibb.co.com/0yCJ1VXC/Frame-2147225766.png" 
          className="w-40 mx-auto opacity-60"
          alt="support"
        />
      </div>

      <p className="mt-10 text-gray-700 text-sm px-6">
        If you face any kind of problem with our service, feel free to contact us.
      </p>

      {/* Contact */}
      <div className="mt-6 text-gray-700 space-y-3">

        <div className="flex items-center justify-center gap-3">
          <FiPhone />
          <span>(608) 327-7982</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <FiMail />
          <span>jotter@gmail.com</span>
        </div>

      </div>

    </div>
  );
}
