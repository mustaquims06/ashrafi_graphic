// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    setAddress(currentUser.address || "");
  }, [navigate]);

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) =>
      u.email === user.email ? { ...u, address } : u
    );

    const updatedUser = { ...user, address };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditing(false);
    alert("✅ Address updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-color)] px-4 gradient-bg">
      <div className="bg-white dark:bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 max-w-md w-full border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold text-center gold-text mb-6 graphic-font">
          My Profile
        </h2>

        <div className="space-y-4 text-[var(--text-color)]">
          <p><strong>Name:</strong> {user.username || user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "Not Added"}</p>

          {!editing ? (
            <>
              <p><strong>Address:</strong> {user.address || "Not Added"}</p>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-[var(--primary)] text-[var(--bg-color)] px-4 py-2 rounded font-medium hover:opacity-80 transition"
                >
                  Edit Address
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <textarea
                rows="3"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded font-medium hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}