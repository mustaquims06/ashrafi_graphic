import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  
  ShoppingCart,
  Heart,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/index.css'; // your Tailwind + CSS-vars

export default function Navigation() {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { wishlist } = useWishlist();

  const navItems = [
    {
      path: '/ProductList',
      icon: Package,
      label: 'Products',
      count: null,
    },
    {
      path: '/cart',
      icon: ShoppingCart,
      label: 'Cart',
      count: getCartItemsCount(),
    },
    {
      path: '/wishlist',
      icon: Heart,
      label: 'Wishlist',
      count: wishlist.length,
    },
  ];

  return (
    <nav className="bg-[var(--bg-color)] shadow-sm border-b border-[var(--secondary)] mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* push nav items to the right */}
          <div className="flex space-x-4 ml-auto">
            {navItems.map(({ path, icon: Icon, label, count }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                        : 'text-[var(--secondary)] hover:text-[var(--primary)] hover:bg-[var(--secondary)]/10'
                    }
                  `}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5 fill-current" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2
                        bg-red-500 text-white text-xs rounded-full
                        h-5 w-5 flex items-center justify-center">
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}