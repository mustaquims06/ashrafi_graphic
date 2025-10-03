// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OrderHistory from "./OrderHistory"; // ✅ connect with real page

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // profile | orders
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ responsive toggle
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-gray-900 dark:bg-gray-800 text-white flex-col justify-between shadow-lg">
        <div>
          <div className="flex flex-col items-center py-8 border-b border-gray-700">
            <div className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-3xl font-bold">
              {user.username?.charAt(0).toUpperCase() ||
                user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-3 font-semibold text-lg">
              {user.username || user.name}
            </h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <nav className="mt-6 flex flex-col space-y-2 px-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`text-left px-4 py-2 rounded-md font-medium transition ${
                activeTab === "profile"
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              👤 Profile Info
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`text-left px-4 py-2 rounded-md font-medium transition ${
                activeTab === "orders"
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              📦 Order History
            </button>
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (slide in) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="w-64 bg-gray-900 dark:bg-gray-800 text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex flex-col items-center py-8 border-b border-gray-700">
                <div className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-3xl font-bold">
                  {user.username?.charAt(0).toUpperCase() ||
                    user.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-3 font-semibold text-lg">
                  {user.username || user.name}
                </h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>

              <nav className="mt-6 flex flex-col space-y-2 px-4">
                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setSidebarOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-md font-medium transition ${
                    activeTab === "profile"
                      ? "bg-[var(--primary)] text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  👤 Profile Info
                </button>
                <button
                  onClick={() => {
                    setActiveTab("orders");
                    setSidebarOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-md font-medium transition ${
                    activeTab === "orders"
                      ? "bg-[var(--primary)] text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  📦 Order History
                </button>
              </nav>
            </div>

            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Mobile top bar */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            User Dashboard
          </h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 bg-[var(--primary)] text-white rounded-md"
          >
            ☰
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl">
            <h3 className="text-xl font-bold mb-6 text-[var(--primary)]">
              Profile Information
            </h3>

            {!editing ? (
              <div className="space-y-3 text-gray-700 dark:text-gray-200">
                <p>
                  <strong>Name:</strong> {user.username || user.name}
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
                  className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-md transition hover:opacity-90"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[var(--primary)] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Address</label>
                  <textarea
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[var(--primary)] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl">
            <h3 className="text-xl font-bold mb-6 text-[var(--primary)]">
              Order History
            </h3>
            {/* ✅ Use existing OrderHistory component */}
            <OrderHistory />
          </div>
        )}
      </main>
    </div>
  );
}