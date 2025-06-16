import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: "",
  });

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const res = await axios.post(
        "/candidate", // your backend endpoint
        candidate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Candidate added successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to add candidate. Check console."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            required
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="party"
            placeholder="Political Party"
            required
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
