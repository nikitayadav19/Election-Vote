import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(`/user/profile?id=${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordChange = async () => {
    setMessage("");
    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters");
      return;
    }
    if (!currentPassword) {
      setMessage("Please enter your current password");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/user/profile/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Password updated successfully");
      setShowPasswordEdit(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("❌ Failed to update password: " + (error?.response?.data?.error || "Try again"));
      console.error(error);
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center mt-10 text-lg">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Your Profile</h2>

      <div className="space-y-2 text-gray-800">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Mobile:</strong> {user.mobile || "-"}</p>
        <p><strong>Email:</strong> {user.email || "-"}</p>
        <p><strong>Address:</strong> {user.address || "-"}</p>
        <p><strong>Aadhar Card Number:</strong> {user.aadharCardNumber || "-"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Has Voted:</strong> {user.isVoted ? "Yes" : "No"}</p>
      </div>

      <div className="mt-10">
        {!showPasswordEdit ? (
          <button
            onClick={() => setShowPasswordEdit(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Edit Password
          </button>
        ) : (
          <div className="space-y-4 mt-4">
            <input
              type="password"
              placeholder="Current Password"
              className="border p-2 rounded w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowPasswordEdit(false);
                  setNewPassword("");
                  setCurrentPassword("");
                  setMessage("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            {message && (
              <p className={`text-sm mt-1 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
