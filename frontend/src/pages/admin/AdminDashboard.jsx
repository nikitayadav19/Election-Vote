import { useNavigate } from "react-router-dom";
import Candidates from "../Candidates";
import { IoMdArrowRoundBack } from "react-icons/io";
const AdminDashboard = () => {
 const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Arrow */}
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} className="text-gray-700 hover:text-black" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          onClick={() => navigate("/add-candidate")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Candidate
        </button>
        <button
          onClick={() => navigate("/livevoting")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📊 Live Voting
        </button>
      </div>

      {/* Candidate List */}
     <Candidates/>
    </div>
  );
};

export default AdminDashboard;
