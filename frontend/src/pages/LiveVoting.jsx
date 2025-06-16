import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// ✅ Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const candidate = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded shadow border border-gray-300">
        <p className="text-sm font-semibold text-black">{candidate.name}</p>
        <p className="text-sm text-gray-700">Party: {candidate.party}</p>
        <p className="text-sm text-orange-600">Votes: {candidate.voteCount}</p>
      </div>
    );
  }

  return null;
};

const LiveVoting = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchVoteCounts = async () => {
    try {
      const res = await axios.get("/candidate/vote/count"); // Expected: [{ _id, name, party, voteCount }]
      setCandidates(res.data);
    } catch (error) {
      console.error("Failed to fetch votes", error);
    }
  };

  useEffect(() => {
    fetchVoteCounts();
    const interval = setInterval(fetchVoteCounts, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">
        📊 Live Voting Results
      </h2>

      <div className="w-full max-w-6xl bg-white shadow-lg rounded p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={candidates}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={100}
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            {/* ✅ Custom Tooltip */}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="voteCount"
              name="Votes"
              fill="#f97316"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-xl font-semibold mb-4">📋 Vote Counts</h3>
        <ul className="bg-gray-100 p-4 rounded shadow">
          {candidates.map((candidate) => (
            <li key={candidate._id} className="mb-2 text-lg">
              <strong>{candidate.name}</strong> ({candidate.party}) —{" "}
              <span className="text-orange-600 font-semibold">
                {candidate.voteCount}
              </span>{" "}
              votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveVoting;
