import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function UpdateCandidate() {
  const { id } = useParams();  // ✅ correct way
  const navigate = useNavigate();

  const [updateddata, setupdateddata] = useState({
    name: "",
    party: "",
    age: "",
  });

  const handleChange = (e) => {
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e,candidateId) => {
     e.preventDefault(); 
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/candidate/${candidateId}`, updateddata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      navigate("/admin-dashboard");  // ✅ redirect after update
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-6 relative">
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} className="text-gray-700 hover:text-black" />
      </div>

      <div className="md:w-1/2 w-full max-w-md bg-gray-100 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update Candidate</h2>
        <form onSubmit={(e) => handleSubmit(e, id)} className="w-full max-w-sm">
          <input type="text" name="name" placeholder="Updated Candidate Name" required onChange={handleChange} className="mb-2 p-2 border w-full rounded" />
          <input type="text" name="party" placeholder="Updated Party Name" required onChange={handleChange} className="mb-4 p-2 border w-full rounded" />
          <input type="number" name="age" placeholder="Updated Age" required onChange={handleChange} className="mb-4 p-2 border w-full rounded" />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full">Update</button>
        </form>
      </div>
    </div>
  );
}
export  default UpdateCandidate