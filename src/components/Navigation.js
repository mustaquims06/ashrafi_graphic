import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";
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

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      await logout(); // ensure async logout (context/local storage clear)
      navigate("/login");
      window.location.reload(); // force full reload to reset all auth-dependent components
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-yellow-400/20 via-yellow-200/10 to-transparent border-b border-yellow-400/30 shadow-[0_2px_10px_rgba(255,215,0,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-end space-x-3">
          {navItems.map(({ path, icon: Icon, label, count }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-yellow-600 bg-yellow-100 shadow-inner"
                    : "text-gray-600 dark:text-gray-200 hover:text-yellow-600 hover:bg-yellow-50 hover:shadow"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-yellow-600 hover:bg-yellow-50 font-medium transition-all duration-300"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">
                  {currentUser.username || currentUser.name || "User"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-yellow-300 rounded-lg shadow-xl overflow-hidden transition-all duration-200">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-yellow-50 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-yellow-50 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>

                  {currentUser.isAdmin && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm font-semibold text-yellow-700 hover:bg-yellow-50 dark:hover:bg-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-yellow-600 hover:bg-yellow-50 font-medium transition-all duration-300"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:block">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}