// src/hooks/useReviews.js
import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

export const useReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return;
      try {
        const res = await axios.get(`${API_URL}/reviews/${productId}`);
        setReviews(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch reviews:", err.message);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, API_URL]);

  /**
   * Add a new review (requires JWT token)
   * @param {string} comment - review text
   * @param {number} rating - 1-5 stars
   */
  const addReview = async (comment, rating) => {
    const token = localStorage.getItem("token"); // ✅ read automatically
    if (!token) {
      toast.warning("Please login first");
      return;
    }
    try {
      const res = await axios.post(
        `${API_URL}/reviews/${productId}`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) => [res.data, ...prev]); // prepend new review
    } catch (err) {
      console.error("❌ Review submission failed:", err.message);
      setError("Failed to submit review");
    }
  };

  return { reviews, loading, error, addReview };
};
