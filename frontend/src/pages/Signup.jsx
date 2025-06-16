import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import Vote from "../assets/vote.avif";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age:"",
    mobile:"",
    email:"",
    address:"",
    aadharCardNumber: "",
    password: "",
    role: "voter",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/signup", formData);
      console.log("res",res)
      console.log("res rokenn", res.data.token)
      console.log("res role",res.data.response.role)
      alert("Signup successful!"); 
       localStorage.setItem("token", res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.response));
      if(res.data.response.role=="voter"){
         navigate('/dashboard');
      }
      else {
        navigate('/admin-dashboard')
      }
    } catch (err) {
      alert(err.response.data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-6 relative">
      {/* Back Arrow */}
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} className="text-gray-700 hover:text-black" />
      </div>

      <div className="md:w-1/2 w-full justify-center items-center mb-6 md:mb-0">
        <img src={Vote} className="max-w-[80%] h-auto" />
      </div>
      <div className="md:w-1/2 w-full max-w-md bg-gray-100 p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />

           <input
            type="number"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
           <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
           <input
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
           <input
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
          <input
            type="text"
            name="aadharCardNumber"
            placeholder="Aadhar (12 digits)"
            required
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="mb-2 p-2 border w-full rounded"
          />
          <select
            name="role"
            onChange={handleChange}
            className="mb-4 p-2 border w-full rounded"
          >
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
