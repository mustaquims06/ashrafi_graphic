// src/pages/OrderHistory.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    // sirf current user ke orders
    const myOrders = storedOrders.filter((o) => o.userEmail === currentUser.email);
    setOrders(myOrders);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">😔 You have not placed any orders yet.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order, index) => (
              <li key={index} className="border-b pb-4">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;