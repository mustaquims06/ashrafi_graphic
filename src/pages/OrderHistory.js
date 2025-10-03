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
    console.log("All orders:", storedOrders); // Debug log
    
    // sirf current user ke orders
    const myOrders = storedOrders.filter((o) => o.userEmail === currentUser.email);
    console.log("Current user email:", currentUser.email); // Debug log
    console.log("Filtered orders:", myOrders); // Debug log
    setOrders(myOrders);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen gradient-bg py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[var(--card-bg)] shadow rounded-lg p-8 border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text mb-6">My Orders</h2>

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

                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    {order.items.map((item, idx) => {
                      const finalPrice = item.offer
                        ? Math.round(item.price - (item.price * parseFloat(item.offer)) / 100)
                        : item.price;
                      return (
                        <li key={idx}>
                          <span className="font-medium">{item.name}</span>{" "}
                          - <span className="font-bold text-[var(--primary)]">₹{finalPrice}</span>
                          {item.offer && (
                            <span className="ml-2 text-sm text-red-500">
                              <span className="line-through text-gray-400">₹{item.price}</span> 🔥 {item.offer}% OFF
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="block text-xs text-gray-500">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.quantity && (
                            <span className="block text-xs text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <p className="mt-2 font-bold text-lg gold-text">
                  Total: ₹{order.total}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;