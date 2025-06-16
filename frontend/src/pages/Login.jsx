import React, { useState } from "react";
import axios from "axios";
import Vote from "../assets/vote.avif";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {
  const [formData, setFormData] = useState({
    aadharCardNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", formData);
      console.log(res)
      console.log(res.data.token)
      console.log(res.data.user.role)
      const role = res.data.user.role;
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
     if(role=="voter") navigate('/dashboard');
     else  navigate('/admin-dashboard')
    } catch (err) {
      alert(err.response.data.error || "Login failed");
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
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="text"
            name="aadharCardNumber"
            placeholder="Aadhar Card Number"
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
            className="mb-4 p-2 border w-full rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
          >
            Sign In
          </button>
          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
