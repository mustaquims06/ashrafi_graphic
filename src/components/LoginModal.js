// src/components/LoginModal.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ open, onClose, onSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email.trim(), password);
    if (!res.ok) {
      setErr(res.message);
      return;
    }
    setErr('');
    if (onSuccess) onSuccess(res.user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Please login to continue</h3>
          <button onClick={onClose} className="text-gray-600 text-xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full px-3 py-2 border rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {err && <div className="text-red-500 text-sm">{err}</div>}
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-[#d4af37] py-2 rounded font-semibold">Login</button>
            <button type="button" onClick={() => { onClose(); navigate('/login'); }} className="flex-1 border py-2 rounded">Open full login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
