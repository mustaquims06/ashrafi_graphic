import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setAddress(currentUser.address || "");
    setPhone(currentUser.phone || "");
  }, [navigate]);

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) =>
      u.email === user.email ? { ...u, address, phone } : u
    );

    const updatedUser = { ...user, address, phone };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditing(false);
    toast.success("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("👋 Logged out successfully!");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-black px-4 py-10">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--primary)] text-white text-center py-10 relative">
          <div className="absolute top-5 right-5">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-md font-medium text-sm"
            >
              🚪 Logout
            </button>
          </div>
          <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold bg-white text-[var(--primary)] shadow-lg">
            {user.username?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 font-bold text-2xl">
            {user.username || user.name}
          </h2>
          <p className="text-sm opacity-90">{user.email}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 border-b pb-2">
            Profile Information
          </h3>

          {!editing ? (
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p>
                <strong>Full Name:</strong> {user.username || user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "Not added"}
              </p>
              <p>
                <strong>Address:</strong> {user.address || "Not added"}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-md transition-all shadow"
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block font-medium mb-1">
                  📞 Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-yellow-300 focus:ring-2 focus:ring-yellow-400 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  🏠 Address
                </label>
                <textarea
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-yellow-300 focus:ring-2 focus:ring-yellow-400 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition"
                >
                  ✖ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}