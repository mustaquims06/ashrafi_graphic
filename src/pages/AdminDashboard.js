import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminDashboard() {
  const [adminProducts, setAdminProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    sizes: [],
    offer: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ for mobile

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const allSizes = ["20.5 cm", "21 cm", "21.5 cm", "22 cm", "22.5 cm", "23 cm"];

  // 🔐 Verify Admin + Fetch Data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.isAdmin) {
      toast.error("Access denied!");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const token = currentUser?.token;
        const [productsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/auth/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setAdminProducts(productsRes.data || []);
        setUsers(usersRes.data.users || []);
      } catch (err) {
        console.error("❌ Backend fetch failed:", err.response?.data || err.message);
      }
    };
    fetchData();
  }, [navigate, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // 📝 Form input changes
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // 🖼 Image Upload (preview + max 4 images)
  const handleMultiFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 4) {
      toast("⚠️ Max 4 images allowed");
      return;
    }
    setFormData((prev) => ({ ...prev, images: Array.from(files) }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.warning("Name & Price required");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.token;

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("sizes", formData.sizes.join(","));
    fd.append("offer", formData.offer);

    if (formData.images.length > 0) {
      formData.images.forEach((file) => fd.append("images", file));
    }

    try {
      let res;
      if (isEditing && editId) {
        res = await axios.put(`${API_URL}/products/${editId}`, fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setAdminProducts((prev) =>
          prev.map((p) => (p._id === editId ? res.data : p))
        );
        toast.success("Product updated!");
      } else {
        res = await axios.post(`${API_URL}/products`, fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setAdminProducts((prev) => [...prev, res.data]);
        toast.success("Product added!");
      }
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      toast.error("Failed to save");
    }

    setFormData({ name: "", description: "", price: "", images: [], sizes: [], offer: "" });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setFormData({ ...product, sizes: product.sizes || [], images: [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.token;
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 bg-gray-800 text-white flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4 border-b border-gray-700">🛠 Admin</h2>
          <nav className="flex flex-col p-2">
            {["overview", "users", "products"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-2 rounded mb-2 capitalize transition ${
                  activeTab === tab ? "bg-[var(--primary)] text-white" : "hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 m-4 p-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* Sidebar - Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold p-4 border-b border-gray-700">🛠 Admin</h2>
              <nav className="flex flex-col p-2">
                {["overview", "users", "products"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-2 rounded mb-2 capitalize transition ${
                      activeTab === tab ? "bg-[var(--primary)] text-white" : "hover:bg-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 m-4 p-2 rounded text-white"
            >
              Logout
            </button>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Panel */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Mobile Topbar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 bg-[var(--primary)] text-white rounded-md"
          >
            ☰
          </button>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded shadow p-6 text-center">
              <h3 className="text-xl gold-text">Users</h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="bg-white rounded shadow p-6 text-center">
              <h3 className="text-xl gold-text">Products</h3>
              <p className="text-3xl font-bold">{adminProducts.length}</p>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="bg-white p-4 rounded shadow overflow-x-auto">
            <h3 className="text-xl font-bold mb-4">👤 Users ({users.length})</h3>
            {users.length === 0 ? (
              <p>No users available.</p>
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
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="border p-2">{u.username || u.name}</td>
                      <td className="border p-2">{u.email}</td>
                      <td className="border p-2">{u.phone || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Form */}
            <div className="bg-white p-4 md:p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-4">
                {isEditing ? "✏️ Edit Product" : "➕ Add Product"}
              </h3>
              <form
                onSubmit={handleAddOrUpdateProduct}
                className="grid gap-3 md:grid-cols-2"
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
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price *"
                  className="border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border p-2 rounded col-span-2"
                />

                {/* Sizes */}
                <div className="col-span-2">
                  <label className="block mb-2 font-medium">Sizes</label>
                  <div className="flex flex-wrap gap-3">
                    {allSizes.map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={() => handleSizeToggle(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultiFileChange}
                  className="col-span-2"
                />

                {/* Preview */}
                {formData.images.length > 0 && (
                  <div className="col-span-2 flex gap-2 flex-wrap">
                    {formData.images.map((file, idx) => {
                      const imgUrl = URL.createObjectURL(file);
                      return (
                        <div key={idx} className="relative">
                          <img
                            src={imgUrl}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded px-1"
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  name="offer"
                  value={formData.offer}
                  onChange={handleChange}
                  placeholder="Offer %"
                  className="border p-2 rounded"
                />

                <button
                  type="submit"
                  className="bg-[var(--primary)] text-white py-2 col-span-2 rounded"
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>

            {/* Product Grid */}
            <div className="bg-white p-4 md:p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-4">🗄 Products</h3>
              {/* scrollable horizontally on small screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminProducts.map((p) => (
                  <div
                    key={p._id}
                    className="border rounded p-4 flex flex-col shadow-sm"
                  >
                    {p.images?.[0] && (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="h-32 w-full object-cover rounded mb-2"
                      />
                    )}
                    <h4 className="font-semibold text-lg">{p.name}</h4>
                    <p className="text-sm text-gray-600 flex-1">{p.description}</p>
                    {p.offer ? (
                      <div className="mt-2">
                        <p className="font-bold text-green-600">
                          ₹
                          {Math.round(
                            p.price - (p.price * parseFloat(p.offer)) / 100
                          )}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹{p.price}
                        </p>
                        <p className="text-xs text-red-500 font-semibold">
                          🔥 {p.offer}% OFF
                        </p>
                      </div>
                    ) : (
                      <p className="mt-2 font-bold">₹{p.price}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Sizes: {p.sizes?.join(", ")}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-500 px-2 py-1 rounded text-white text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 px-2 py-1 rounded text-white text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}