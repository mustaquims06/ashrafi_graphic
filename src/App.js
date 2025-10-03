// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";   // ✅ Import Toaster

import Home from './pages/Home';
import DiscoverProjects from "./pages/DiscoverProjects";
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import './styles/animations.css';

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";   // ✅ Auth provide

import PrivateRoute from "./components/PrivateRoute";

// Pages
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/Orders";

import WhatsAppBot from "./components/WhatsAppBot";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            {/* ✅ Add Toaster globally here */}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "var(--card-bg)",
                  color: "var(--text-color)",
                  border: "1px solid var(--secondary)",
                },
                success: {
                  icon: "✅",
                },
                error: {
                  icon: "❌",
                },
              }}
            />
            
            <div className="App min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow gradient-bg">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/discover-projects" element={<DiscoverProjects />} />
                  <Route path="/services" element={<ServicesPage />} />

                  <Route path="/productlist" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/partners" element={<PartnersPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                   <Route path="/orders" element={<Orders />} />


                  {/* Protected User Routes */}
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <Cart />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <PrivateRoute>
                        <Wishlist />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <OrderHistory />
                      </PrivateRoute>
                    }
                  />

                  {/* ✅ Admin Only Route */}
                  <Route
                    path="/admin-dashboard"
                    element={
                      <PrivateRoute adminOnly>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                </Routes>

                {/* ✅ Floating WhatsApp bot visible everywhere */}
                <WhatsAppBot />
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}