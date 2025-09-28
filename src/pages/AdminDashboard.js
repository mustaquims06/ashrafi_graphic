import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function AdminDashboard() {
  const { products: baseProducts } = useProducts();
  const [adminProducts, setAdminProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    video: "",
    sizes: "",
    offer: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // ✅ Admin check
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.isAdmin) {
      alert("⛔ Access denied!");
      navigate("/login");
      return;
    }
    setAdminProducts(JSON.parse(localStorage.getItem("products")) || []);
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, [navigate]);

  const allProducts = [...(baseProducts || []), ...adminProducts];

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // ✅ Form Handlers
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleMultiFileChange = (e) => {
    const { files } = e.target;
    const imagesArr = [];
    Array.from(files).forEach((file, idx) => {
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

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, video: reader.result }));
      reader.readAsDataURL(files[0]);
    }
  };

  // ✅ Add / Update Product
  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("⚠️ Name & Price required");
      return;
    }

    if (isEditing) {
      const updated = adminProducts.map((p) =>
        p.id === editId
          ? {
              ...formData,
              id: editId,
              price: parseFloat(formData.price),
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
        price: parseFloat(formData.price),
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
      price: "",
      images: [],
      video: "",
      sizes: "",
      offer: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  // ✅ Edit
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditId(product.id);
    setFormData({
      ...product,
      sizes: product.sizes ? product.sizes.join(", ") : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete
  const handleDelete = (id) => {
    const updated = adminProducts.filter((p) => p.id !== id);
    setAdminProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen gradient-bg py-6">
      <div className="container mx-auto px-4 max-w-6xl bg-white p-6 rounded shadow">
        
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold gold-text">🛠 Admin Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {["overview", "users", "products"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded capitalize ${
                activeTab === tab
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ✅ Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card p-6 text-center">
              <h3 className="text-xl gold-text">Users</h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-xl gold-text">Products</h3>
              <p className="text-3xl font-bold">{allProducts.length}</p>
            </div>
          </div>
        )}

        {/* ✅ Users Tab */}
        {activeTab === "users" && (
          <div>
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
                  {users.map((u, i) => (
                    <tr key={i}>
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

        {/* ✅ Products Tab */}
        {activeTab === "products" && (
          <div>
            {/* Form */}
            <form onSubmit={handleAddOrUpdateProduct} className="grid gap-3 md:grid-cols-2 mb-6">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className="border p-2 rounded"/>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price *" className="border p-2 rounded"/>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-2"/>
              <input type="file" accept="image/*" multiple onChange={handleMultiFileChange} className="col-span-2"/>
              <input type="file" accept="video/*" onChange={handleFileChange} className="col-span-2"/>
              <input name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma separated)" className="border p-2 rounded"/>
              <input name="offer" value={formData.offer} onChange={handleChange} placeholder="Offer" className="border p-2 rounded"/>
              <button type="submit" className="bg-[var(--primary)] text-white py-2 col-span-2 rounded">
                {isEditing ? "✏️ Update Product" : "➕ Add Product"}
              </button>
            </form>

            {/* 🔍 Preview Section Always Visible If FormData Has Something */}
            {(formData.name || formData.price || formData.description || formData.images.length > 0 || formData.video) && (
              <div className="mb-6 p-4 border rounded bg-gray-50">
                <h4 className="font-bold mb-2">🔍 Preview</h4>
                <p><strong>{formData.name || "Product Name"}</strong> - ₹{formData.price || "0"}</p>
                <p>{formData.description || "No description yet..."}</p>
                {formData.offer && <span>🔥 {formData.offer}</span>}
                {formData.sizes && <p>Sizes: {formData.sizes}</p>}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.images.map((img) => (
                    <img key={img.id} src={img.url} alt="preview" className="w-20 h-20 object-cover rounded"/>
                  ))}
                </div>
                {formData.video && (
                  <video src={formData.video} controls className="w-40 h-28 mt-2 rounded"/>
                )}
              </div>
            )}

            {/* Product List */}
            <ul className="space-y-3">
              {allProducts.map((p) => (
                <li key={p.id} className="flex flex-col sm:flex-row justify-between border rounded p-3">
                  <div>
                    <h4 className="font-semibold">{p.name} - ₹{p.price}</h4>
                    <p>{p.description}</p>
                    {p.offer && <span>🔥 {p.offer}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p)} className="bg-yellow-500 px-2 py-1 rounded text-white">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}