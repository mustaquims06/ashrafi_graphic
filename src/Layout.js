import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./components/Navigation.js";  // Navbar

const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ Nav only for /products and /product/:id
  const isProductsPage = location.pathname === "/products";
  const isProductDetail = location.pathname.startsWith("/product/");

  const shouldShowNav = isProductsPage || isProductDetail;

  return (
    <>
      {shouldShowNav && <Navigation />}
      {children}
    </>
  );
};

export default Layout;