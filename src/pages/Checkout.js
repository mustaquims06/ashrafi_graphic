import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import RazorpayPayment from "../components/RazorpayPayment";

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

  // ✅ Use finalPrice if available, else fallback to price
  const total = cart.reduce(
    (sum, item) =>
      sum + (item.finalPrice || item.price) * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!paymentMethod || !phone || !address) {
      toast.error("⚠️ Please fill all details (phone, address, payment method)");
      return;
    }

    // Update profile locally
    const updatedUser = { ...user, phone, address };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Prepare order payload
    const items = cart.map((i) => ({
      productId: i._id || i.id,
      name: i.name,
      price: i.finalPrice || i.price,
      quantity: i.quantity || 1,
      selectedSize: i.selectedSize || null,
    }));

    const newOrder = {
      id: Date.now(),
      userEmail: user.email,
      items,
      total,
      phone,
      address,
      paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      const token = updatedUser.token;
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Backend error: ${res.status} - ${errorText}`);
      }

      await res.json();
toast.success("✅ Order placed successfully! Redirecting...");

    // 🕒 Redirect after 5 seconds
    setTimeout(() => {
      clearCart();
      navigate("/productlist");
    }, 5000);
    } catch (err) {
      console.warn("⚠️ Order failed:", err.message);

      // Fallback local save
      const offlineOrders =
        JSON.parse(localStorage.getItem("offlineOrders")) || [];
      offlineOrders.push(newOrder);
      localStorage.setItem("offlineOrders", JSON.stringify(offlineOrders));

      toast.error("⚠️ Backend failed. Order saved locally.");
      clearCart();
      navigate("/orders");
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <p className="text-lg gold-text animate-pop">
          Your cart is empty. Please add products first.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[var(--card-bg)] shadow-xl rounded-lg p-8 border border-[var(--secondary)]">
        <h2 className="text-3xl font-bold gold-text mb-6 text-center">
          Checkout
        </h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>
                  {item.name} × {item.quantity || 1}
                  {item.selectedSize && (
                    <span className="block text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </span>
                  )}
                </span>
                <span>
                  ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                </span>
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
          <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
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
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <div className="space-y-2">
            <label className="block">
              <input
                type="radio"
                name="pm"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Pay Online (Credit/Debit Card, UPI, Netbanking)
            </label>
            <label className="block">
              <input
                type="radio"
                name="pm"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        <div>
          {paymentMethod === "Razorpay" ? (
            <RazorpayPayment
              amount={total}
              onSuccess={(response) => {
                toast.success("Payment successful!");
                handlePlaceOrder();
              }}
              onFailure={(error) => {
                toast.error("Payment failed. Please try again.");
                console.error("Payment failed:", error);
              }}
            />
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;