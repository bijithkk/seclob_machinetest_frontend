import React from "react";
import { useState } from 'react';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import styles from './NavBar.module.css';
import CartModal from "./CartModel/CartModel";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(1); // Setting to 1 to demonstrate the badge

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Here you would typically implement actual search functionality
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.innerContainer}>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                placeholder="Search any things"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button onClick={handleSearch} className={styles.searchButton}>
                <Search size={18} />
                <span className={styles.searchButtonText}>Search</span>
              </button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className={styles.navIcons}>
            {/* Favorites */}
            <div className={styles.iconContainer}>
              <Heart
                size={24}
                className={styles.icon}
                fill={favoritesCount > 0 ? "currentColor" : "none"}
              />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </div>

            {/* Sign In */}
            <div className={`${styles.iconContainer} ${styles.signIn}`}>
              <User size={20} className={styles.icon} />
              <span className={styles.iconText}>Sign In</span>
            </div>

            {/* Cart */}
            <div onClick={toggleCart} className={`${styles.iconContainer} ${styles.cart}`}>
              <ShoppingCart size={20} className={styles.icon} />
              <span className={styles.iconText}>Cart</span>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </div>

          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
