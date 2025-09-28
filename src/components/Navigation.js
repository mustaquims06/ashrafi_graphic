// src/components/Navigation.js
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Package, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext"; 
import "../styles/index.css";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const { currentUser, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
   
    { path: "/cart", icon: ShoppingCart, label: "Cart", count: getCartItemsCount() },
    { path: "/wishlist", icon: Heart, label: "Wishlist", count: wishlist.length },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--bg-color)] shadow-sm border-b border-[var(--secondary)] mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Only Right Side Menu */}
        <div className="flex items-center h-16 justify-end">
          <div className="flex space-x-4">
            {navItems.map(({ path, icon: Icon, label, count }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition 
                    ${
                      isActive
                        ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                        : "text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--secondary)]/10"
                    }`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block">{label}</span>
                </Link>
              );
            })}

            {/* User Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--secondary)]/10"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{currentUser.username || currentUser.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[var(--card-bg)] border rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    {currentUser.isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--secondary)]/10"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}