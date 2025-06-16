import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import Candidates from "./pages/Candidates";
import LiveVoting from "./pages/LiveVoting";
import Vote from "./pages/user/Vote";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCandidate from "./pages/admin/AddCandidate";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./pages/ProtectedRoute";
import UpdateCandidate from "./pages/admin/UpdateCandidate";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/livevoting" element={<LiveVoting />} />
        <Route path="/candidates" element={<Candidates />} />
        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["voter"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["voter"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vote"
          element={
            <ProtectedRoute allowedRoles={["voter"]}>
              <Vote />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/admin/update-candidate/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateCandidate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-candidate"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddCandidate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
