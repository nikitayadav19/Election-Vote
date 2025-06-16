import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function Candidates() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [role, setRole] = useState(""); // 👈 New state for user role

  useEffect(() => {
    fetchCandidates();
    getUserRole();
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

  const getUserRole = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/candidate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCandidates(); // Refresh list
    } catch (err) {
      console.error("Error deleting candidate:", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Candidates</h2>
      {candidates.length === 0 ? (
        <p className="text-gray-500">No candidates available.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Party</th>
              <th className="p-2">Age</th>
              {role === "admin" && <th className="p-2">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="border-b">
                <td className="p-2">{candidate.name}</td>
                <td className="p-2">{candidate.party}</td>
                <td className="p-2">{candidate.age}</td>
                {role === "admin" && (
                  <td className="p-2 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/update-candidate/${candidate._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(candidate._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Candidates;
