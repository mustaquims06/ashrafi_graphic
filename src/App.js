// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DiscoverProjects from "./pages/DiscoverProjects";
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/PartnersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import './styles/animations.css';
import WhatsAppBot from "./components/WhatsAppBot";
function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover-projects" element={<DiscoverProjects />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
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
  );
}

export default App;