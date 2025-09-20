import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Checkout() {
  const [form, setForm] = useState({ name:'', address:'', mobile:'' });
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('shipping', JSON.stringify(form));
    nav('/payment');
  };

  return (
    <div className="min-h-screen gradient-bg p-6">
      <Navigation />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[var(--card-bg)] p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold gold-text mb-4">Shipping Details</h2>
        <input name="name"    required placeholder="Full Name"
          onChange={e=>setForm({...form, name:e.target.value})}
          className="w-full mb-4 p-2 border rounded" />

        <textarea name="address" required placeholder="Address"
          onChange={e=>setForm({...form, address:e.target.value})}
          className="w-full mb-4 p-2 border rounded" />

        <input name="mobile" required placeholder="Mobile Number"
          onChange={e=>setForm({...form, mobile:e.target.value})}
          className="w-full mb-6 p-2 border rounded" />

        <button type="submit"
          className="w-full bg-[var(--primary)] text-[var(--bg-color)] py-2 rounded">
          Continue to Payment
        </button>
      </form>
    </div>
  );
}