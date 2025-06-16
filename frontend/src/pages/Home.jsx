import React from "react";
import { useNavigate } from 'react-router-dom';
import flag from "../assets/flag-india.jpg";
//import axios from 'axios';
function Home() {
  const navigate = useNavigate();
  //const isLoggedIn = !!localStorage.getItem("token"); // Basic token check
 {/* const handleLiveCount = async () => {
    try {
      const response = await axios.get("/candidate/vote/count");
      console.log("Live Vote Count:", response.data);
      alert(`Live Vote Count: ${response.data}`); // customize based on your response
    } catch (error) {
      console.error("Error fetching vote count:", error);
      alert("Failed to fetch vote count.");
    }
  };
   const handleCandidate = async () => {
    try {
      const response = await axios.get("/candidate");
      console.log("Live Vote Count:", response.data);
      alert(`Live Vote Count: ${response.data}`); // customize based on your response
    } catch (error) {
      console.error("Error fetching vote count:", error);
      alert("Failed to fetch vote count.");
    }
  };*/}
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Top Nav Buttons */}

      {/* Flag Image */}
      <img
        src={flag}
        alt="Indian Flag"
        className="w-full max-h-60 object-contain mb-4"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-4">
        All Votes Matter - Yours Too!
      </h1>

      {/* Middle Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
            onClick={()=> navigate('/livevoting')}
        >
           Live Voting Count
        </button>

        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
           onClick={()=>navigate('/candidates')}
        >
          Candidate List
        </button>

        <div className="w-full max-w-md flex justify-between mb-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-[48%]"
          >
            Login
          </button>
          <button
             onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-[48%]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
