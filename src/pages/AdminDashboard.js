// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png"; // ✅ replace with your actual logo


export default function AdminDashboard() {
  const { products: baseProducts } = useProducts();
  const [adminProducts, setAdminProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    sizes: "",
    offer: "",
    images: [],
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // ✅ Check Admin
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.isAdmin) {
      alert("⛔ Access denied!");
      navigate("/login");
      return;
    }
    setAdminProducts(JSON.parse(localStorage.getItem("products")) || []);
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, [navigate]);

  const allProducts = [...(baseProducts || []), ...adminProducts];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("✅ Logged out!");
    navigate("/login");
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ✅ Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagesArr = [];

    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagesArr.push({ id: Date.now() + "-" + idx, url: reader.result });
        if (imagesArr.length === files.length) {
          setFormData((prev) => ({ ...prev, images: imagesArr }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Add / Update Product
  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.originalPrice || !formData.salePrice) {
      alert("⚠️ Name, Original & Sale price required");
      return;
    }

    const discount = Math.round(
      ((formData.originalPrice - formData.salePrice) /
        formData.originalPrice) *
        100
    );

    if (isEditing) {
      const updated = adminProducts.map((p) =>
        p.id === editId
          ? {
              ...formData,
              id: editId,
              originalPrice: parseFloat(formData.originalPrice),
              salePrice: parseFloat(formData.salePrice),
              discount,
              sizes: formData.sizes
                ? formData.sizes.split(",").map((s) => s.trim())
                : [],
            }
          : p
      );
      setAdminProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      alert("✏️ Product updated!");
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        originalPrice: parseFloat(formData.originalPrice),
        salePrice: parseFloat(formData.salePrice),
        discount,
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim())
          : [],
      };
      const updated = [...adminProducts, newProduct];
      setAdminProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      alert("✅ Product added!");
    }

    setFormData({
      name: "",
      description: "",
      originalPrice: "",
      salePrice: "",
      sizes: "",
      offer: "",
      images: [],
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (p) => {
    setIsEditing(true);
    setEditId(p.id);
    setFormData({
      ...p,
      sizes: p.sizes ? p.sizes.join(", ") : "",
    });
  };

  const handleDelete = (id) => {
    const updated = adminProducts.filter((p) => p.id !== id);
    setAdminProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const handleDispatch = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "Dispatched" } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    alert("📦 Order dispatched!");
  };

  return (
    <div className="min-h-screen flex flex-col">
   
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col">
          <h2 className="text-2xl py-4 text-center font-bold border-b border-gray-700 gold-text">
            Admin Panel
          </h2>
          <nav className="flex-1 p-4 space-y-2">
            {["overview", "users", "products", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full px-4 py-2 rounded capitalize text-left ${
                  activeTab === tab
                    ? "bg-[var(--primary)] text-black font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="m-4 bg-red-500 px-3 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <h3 className="text-xl gold-text">Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-xl gold-text">Products</h3>
                <p className="text-3xl font-bold">{allProducts.length}</p>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-xl gold-text">Orders</h3>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div>
              <h3 className="text-xl font-bold mb-4">👤 Users</h3>
              {users.length === 0 ? (
                <p>No users available</p>
              ) : (
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td className="border p-2">{u.username || u.name}</td>
                        <td className="border p-2">{u.email}</td>
                        <td className="border p-2">{u.phone || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Products */}
          {activeTab === "products" && (
            <div>
              <h3 className="text-xl font-bold mb-4">🛍 Products</h3>
              <form
                onSubmit={handleAddOrUpdateProduct}
                className="grid gap-3 md:grid-cols-2 mb-6"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="Original Price *"
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  placeholder="Sale Price *"
                  className="border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded col-span-2"
                  placeholder="Description"
                />
                <input
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  placeholder="Sizes (comma separated)"
                  className="border p-2 rounded"
                />
                <input
                  name="offer"
                  value={formData.offer}
                  onChange={handleChange}
                  placeholder="Offer"
                  className="border p-2 rounded"
                />

                {/* Image upload */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="col-span-2"
                />

                <button
                  type="submit"
                  className="bg-[var(--primary)] text-white py-2 col-span-2 rounded"
                >
                  {isEditing ? "✏️ Update Product" : "➕ Add Product"}
                </button>
              </form>

              <ul className="space-y-2">
                {adminProducts.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <div className="flex items-center gap-3">
                      {p.images && p.images.length > 0 ? (
                        <img
                          src={p.images[0].url || p.images[0]}
                          alt={p.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                          No Img
                        </div>
                      )}
                      <div>
                        <h4>{p.name}</h4>
                        <p>
                          <span className="line-through text-gray-500 mr-2">
                            ₹{p.originalPrice}
                          </span>
                          <span className="text-green-600">₹{p.salePrice}</span>
                          <span className="ml-2 text-red-500">
                            ({p.discount}% OFF)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-500 px-2 py-1 rounded text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 px-2 py-1 rounded text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
  <div>
    <h3 className="text-xl font-bold mb-4">📦 Orders</h3>
    {orders.length === 0 ? (
      <p>No orders found</p>
    ) : (
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">OrderID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td className="border p-2">{o.id}</td>
              <td className="border p-2">{o.userEmail}</td>
              <td className="border p-2">
                {o.items.map((it, idx) => (
                  <div key={idx}>
                    {it.name} (x{it.quantity}){" "}
                    <span className="text-xs text-gray-500">
                      ₹{it.originalPrice} → ₹{it.salePrice}
                    </span>
                  </div>
                ))}
              </td>
              <td className="border p-2">₹{o.total}</td>
              <td className="border p-2 font-semibold">{o.status}</td>

              {/* ✅ Update Status Dropdown */}
              <td className="border p-2">
                <select
                  value={o.status}
                  onChange={(e) => {
                    const updatedOrders = orders.map((ord) =>
                      ord.id === o.id ? { ...ord, status: e.target.value } : ord
                    );
                    setOrders(updatedOrders);
                    localStorage.setItem("orders", JSON.stringify(updatedOrders));
                    alert(`✔️ Order ${o.id} marked as ${e.target.value}`);
                  }}
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
        </div>
      </div>
    </div>
  );
}