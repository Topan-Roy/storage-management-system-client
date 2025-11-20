import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function About() {
     const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen bg-white px-5 pt-6">

            <div className="w-full flex items-center">
                <HiOutlineChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
                <h1 className="flex-1 text-center text-xl font-semibold">
                    About Us
                </h1>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-700">
                Shower Share is an innovative app designed to make sharing bathroom resources easier, more convenient, and sustainable. Whether you're a college student, a young professional, or anyone with limited access to private bathrooms, Shower Share is here to provide a seamless and respectful platform for sharing shower spaces.<br></br>
                Our mission is to create a community-driven platform that connects people in need of shower facilities with those who have them available, all while ensuring safety, privacy, and convenience.
                Why Shower Share?<br></br>
                Sustainable Living: We aim to reduce water waste and promote eco-friendly practices by encouraging the efficient use of bathroom resources.
                Convenience: Never struggle to find a shower when you need one again. With Shower Share, you can easily locate nearby available showers and book a time slot within seconds.<br></br>
                Community-Focused: Shower Share isn’t just an app; it's a community. We prioritize mutual respect, privacy, and trust among users.
                Privacy & Safety: Our platform ensures that both users and hosts are verified and reviews are transparent to guarantee a safe and pleasant experience for everyone.<br></br>
                Whether you’re traveling, moving between homes, or just need a clean, private space to refresh, Shower Share is the answer.<br></br>
                Join the Shower Share community today, and let’s make everyday life a little bit easier and a lot more sustainable.
                Join the Shower Share community today!
            </p>
        </div>
    );
}
