import { useEffect, useState } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "https://ashrafigraphic.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        if (res.data) {
          setProducts(res.data);
          console.log("Fetched products:", res.data); // Debug log
        } else {
          console.log("No products data in response");
        }
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return { products, loading };
};
