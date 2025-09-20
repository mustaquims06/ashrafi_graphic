// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DiscoverProjects from "./pages/DiscoverProjects";
import ServicesPage from './pages/ServicesPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';



import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import './styles/animations.css';
import WhatsAppBot from "./components/WhatsAppBot";




function App() {
  return (
<CartProvider>
      <WishlistProvider>
    <Router>
      <ScrollToTop />
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover-projects" element={<DiscoverProjects />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/ProductList" element={<ProductList />} />
               <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
           
          </Routes>
            {/* ✅ Floating WhatsApp bot visible everywhere */}
        <WhatsAppBot />
        </main>
        <Footer />
      </div>
    </Router>
 </WishlistProvider>
    </CartProvider>
  );
}

export default App;