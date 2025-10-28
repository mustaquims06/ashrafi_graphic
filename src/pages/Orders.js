// src/pages/Orders.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
          navigate("/login");
          return;
        }

        const token = currentUser.token;
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.warn("⚠️ Could not fetch orders from backend.");
          setOrders(JSON.parse(localStorage.getItem("orders")) || []);
        }
      } catch (err) {
        console.error("❌ Orders fetch failed:", err);
        setOrders(JSON.parse(localStorage.getItem("orders")) || []);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <ul className="divide-y">
          {orders.map((order) => (
            <li key={order._id || order.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">
                    Order #{order._id || order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {order.date
                      ? new Date(order.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Date not available"}
                  </p>
                  <ul className="mt-2 text-sm text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity || 1}
                        {item.selectedSize && (
                          <span className="ml-2 text-xs text-gray-500">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right font-semibold">
                  ₹{order.total}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
