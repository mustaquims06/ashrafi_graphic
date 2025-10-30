// src/pages/OrderDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
          navigate("/login");
          return;
        }

        const token = currentUser.token;
        if (token) {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL || "https://ashrafigraphic.com"}/api/orders/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.ok) {
            const data = await res.json();
            setOrder(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Backend fetch failed, checking local orders");
      }

      // fallback local
      const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const found = localOrders.find(
        (o) => String(o._id || o.id) === String(id)
      );
      setOrder(found || null);
      setLoading(false);
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Order #{order._id || order.id}
        </h1>
        <p className="text-gray-600 mb-6">
          Placed on{" "}
          {order.date
            ? new Date(order.date).toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Date not available"}
        </p>

        {/* Items */}
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <ul className="divide-y">
          {order.items.map((item, idx) => (
            <li key={idx} className="py-3 flex justify-between">
              <span>
                {item.name} × {item.quantity || 1}
                {item.selectedSize && (
                  <span className="block text-xs text-gray-500">
                    Size: {item.selectedSize}
                  </span>
                )}
              </span>
              <span>₹{item.price * (item.quantity || 1)}</span>
            </li>
          ))}
        </ul>

        {/* Total */}
        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        {/* Delivery info */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Delivery</h2>
          <p className="text-sm">
            <strong>Phone:</strong> {order.phone}
          </p>
          <p className="text-sm">
            <strong>Address:</strong> {order.address}
          </p>
          <p className="text-sm">
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
