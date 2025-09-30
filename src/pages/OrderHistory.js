// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegSadTear,
  FaShoppingCart,
  FaFileInvoice,
} from "react-icons/fa";
import OrderTimeline from "../components/OrderTimeline";

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
    const myOrders = storedOrders.filter(
      (o) => o.userEmail === currentUser.email
    );
    setOrders(myOrders);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12">
            <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
            <p className="text-lg font-semibold text-gray-700">
              You have not placed any orders yet.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Your orders will show up here once you start shopping.
            </p>
            <button
              onClick={() => navigate("/productlist")}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg shadow-md hover:brightness-110 transition"
            >
              <FaShoppingCart className="inline-block mr-2" />
              Browse Products
            </button>
          </div>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li key={order.id} className="border-b pb-4">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                {/* ✅ NEW Delivery By line */}
                {order.expectedDelivery && (
                  <p className="text-green-600 font-semibold">
                    🚚 Delivery By: {order.expectedDelivery}
                  </p>
                )}
                 {/* ✅ Timeline Component */}
    <OrderTimeline status={order.status} />

                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} — ₹
                        {item.salePrice || item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-3 bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2">
                  <FaFileInvoice /> Download Invoice
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;