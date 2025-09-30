// src/pages/Checkout.js   (important: replace your file with this)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setPhone(currentUser.phone || "");
    setAddress(currentUser.address || "");
  }, [navigate]);

  const handlePlaceOrder = () => {
    if (!paymentMethod || !phone || !address) {
      alert("⚠️ Please fill all details (phone, address, payment method)");
      return;
    }

    // Update user profile
    const updatedUser = { ...user, phone, address };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Save order
    const newOrder = {
      id: Date.now(),
      userEmail: user.email,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.price, 0),
      phone,
      address,
      paymentMethod,
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("✅ Order placed successfully!");

    clearCart();
    navigate("/orders"); // go to order history
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Your cart is empty. Add products first.</p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Delivery Details</h3>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <textarea
            placeholder="Delivery Address"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Payment */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Payment</h3>
          <label className="block">
            <input type="radio" name="pm" value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            💳 Credit Card
          </label>
          <label className="block">
            <input type="radio" name="pm" value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            💰 UPI / Netbanking
          </label>
          <label className="block">
            <input type="radio" name="pm" value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            📦 Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;