import { useState, useEffect } from 'react';
import { products, reviews, userPurchases, currentUser } from '../data/mockData';

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { products, loading };
};

export const useProduct = (productId) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [productId]);
  
  return { product, loading };
};

export const useReviews = (productId) => {
  const [loading, setLoading] = useState(true);
  const [productReviews, setProductReviews] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const productReviewsList = reviews[parseInt(productId)] || [];
      setProductReviews(productReviewsList);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [productId]);
  
  const addReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date(),
      verified: true
    };
    setProductReviews(prev => [reviewWithId, ...prev]);
  };
  
  return { reviews: productReviews, loading, addReview };
};

export const useUserPurchases = () => {
  const hasPurchased = (productId) => {
    return userPurchases.some(purchase => purchase.productId === productId);
  };
  
  return { hasPurchased, purchases: userPurchases };
};
