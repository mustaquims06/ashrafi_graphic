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

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.finalPrice || item.price) * (item.quantity || 1),
    0
  );

  // NEW: validators
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone.trim());
  const isAddressValid = address.trim().length >= 10;
  const isFormValid = Boolean(paymentMethod && isPhoneValid && isAddressValid);

  const handlePlaceOrder = async () => {
    // NEW: strict checks
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!isPhoneValid) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!isAddressValid) {
      toast.error("Please enter a complete address (min 10 characters)");
      return;
    }

    const updatedUser = { ...user, phone: phone.trim(), address: address.trim() };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

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
      phone: phone.trim(),
      address: address.trim(),
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

      setTimeout(() => {
        clearCart();
        navigate("/productlist");
      }, 5000);
    } catch (err) {
      console.warn("⚠️ Order failed:", err.message);

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
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full border px-3 py-2 rounded mb-3 ${phone && !isPhoneValid ? 'border-red-500' : ''}`}
            // HTML hints (won't enforce without form submit, but helps mobile keyboards)
            inputMode="numeric"
            pattern="[6-9]\d{9}"
            maxLength={10}
            required
          />
          <textarea
            placeholder="Delivery Address"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${address && !isAddressValid ? 'border-red-500' : ''}`}
            minLength={10}
            required
          />
          {/* Optional inline hints */}
          {!isPhoneValid && phone && (
            <p className="text-sm text-red-600 mt-1">Enter a valid 10-digit phone (starts with 6-9).</p>
          )}
          {!isAddressValid && address && (
            <p className="text-sm text-red-600 mt-1">Address should be at least 10 characters.</p>
          )}
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
            isFormValid ? (
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
                disabled
                className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg cursor-not-allowed"
              >
                Fill phone & address to continue
              </button>
            )
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={!isFormValid}
              className={`w-full bg-[var(--primary)] text-white py-3 rounded-lg transition ${!isFormValid ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
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