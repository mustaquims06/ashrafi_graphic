// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowPayment(false);
  };

  const handleOrder = (product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePayment = (method) => {
    toast.success(`Payment successful via ${method}! Order for ${selectedProduct.name} has been placed.`);
    setShowPayment(false);
    setSelectedProduct(null);
  };

  // Sample products
  const products = [
    { id: 1, name: 'Design Template Pack', price: '$49', description: 'Professional design templates' },
    { id: 2, name: 'Branding Kit', price: '$99', description: 'Complete branding package' },
    { id: 3, name: 'UI/UX Components', price: '$79', description: 'Reusable UI components' }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* User Info Bar */}
        {currentUser && (
          <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg flex justify-between items-center">
            <div>
              Welcome, <strong>{currentUser.username}</strong>! 
              {currentUser.isAdmin && ' (Admin)'}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}

        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Products</h1>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {currentUser 
              ? 'Explore our premium design products and templates' 
              : 'Login to access our products and make purchases'
            }
          </p>
        </ScrollAnimation>

        {!currentUser ? (
          <ScrollAnimation animation="fade-in-up" delay={0.4}>
            <div className="card rounded-lg p-12 text-center max-w-4xl mx-auto">
              <div className="text-6xl mb-6">🔐</div>
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please login to view our products and make purchases.
              </p>
              <button
                onClick={handleLoginRedirect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Login to Continue
              </button>
            </div>
          </ScrollAnimation>
        ) : (
          <>
            {/* Products Grid */}
            <ScrollAnimation animation="fade-in-up" delay={0.4}>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold gold-text">{product.price}</span>
                      <button
                        onClick={() => handleOrder(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            {/* Payment Modal */}
            {showPayment && selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
                  <h3 className="text-2xl font-bold mb-4">Complete Your Order</h3>
                  <p className="mb-4">Product: <strong>{selectedProduct.name}</strong></p>
                  <p className="mb-6">Price: <strong>{selectedProduct.price}</strong></p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold">Select Payment Method:</h4>
                    <button 
                      onClick={() => handlePayment('Credit Card')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                    >
                      💳 Credit Card
                    </button>
                    <button 
                      onClick={() => handlePayment('PayPal')}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded"
                    >
                      📱 PayPal
                    </button>
                    <button 
                      onClick={() => handlePayment('UPI')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
                    >
                      💰 UPI Payment
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setShowPayment(false)}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;