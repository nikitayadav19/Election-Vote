import React, { useEffect, useState } from "react";
import axios from "axios";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  const handleVote = async (candidateID) => {
    try {
      console.log(candidateID)
      const token = localStorage.getItem("token");
      console.log("token",token)
      const res = await axios.get(`/candidate/vote/${candidateID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.message);
      setHasVoted(true);
    } catch (err) {
      if (err.response?.status === 400 && err.response.data.message === "You have already voted") {
        setHasVoted(true);
        setMessage("You have already voted.");
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🗳️ Cast Your Vote
      </h2>

      {message && (
        <div className="text-center mb-6 text-white bg-blue-600 px-4 py-3 rounded shadow">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{candidate.name}</h3>
            <p className="text-gray-600 mb-1"><strong>Party:</strong> {candidate.party}</p>
            <p className="text-gray-600 mb-4"><strong>Age:</strong> {candidate.age}</p>
            <button
              disabled={hasVoted}
              onClick={() => handleVote(candidate._id)}
              className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                hasVoted
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {hasVoted ? "Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
