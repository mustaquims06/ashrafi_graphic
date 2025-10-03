import { useEffect, useState } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return { products, loading };
};
