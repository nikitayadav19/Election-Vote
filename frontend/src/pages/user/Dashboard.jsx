import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Candidates from "../Candidates";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Profile Icon (Top Right) */}
      <div className="absolute top-4 right-6">
        <FaUserCircle
          size={30}
          className="text-gray-700 cursor-pointer"
          onClick={toggleProfileMenu}
        />
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        )}
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-12 text-center">Welcome to Voting Portal</h1>

      {/* Main Vote Now Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/vote")}
          className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold px-10 py-5 rounded-xl shadow-2xl animate-pulse"
        >
          🗳️ Vote Now
        </button>
      </div>

      {/* Secondary Buttons */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => navigate("/livevoting")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
        >
          📊 View Live Voting
        </button>

        <div className="w-full max-w-3xl">
          <Candidates />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
