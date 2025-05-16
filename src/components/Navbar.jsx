import React, { useContext } from "react";
import { useState } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import styles from "./NavBar.module.css";
import CartModal from "./CartModel/CartModel";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { searchProducts, getProductsData, token } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0); // Setting to 1 to demonstrate the badge

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return toast.warn("Please enter a search term");
    }
    searchProducts(searchQuery);
  };
  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);

                  // Reset product list when input is cleared
                  if (value.trim() === "") {
                    getProductsData(token);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className={styles.searchInput}
                aria-label="Search products"
              />
              <div className={styles.searchIcon}>
                <Search size={16} color="#8a8a8a" />
              </div>
              <button
                onClick={handleSearch}
                className={styles.searchButton}
                aria-label="Submit search"
              >
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
                onClick={toggleWishlist}
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
            <div className={`${styles.iconContainer} ${styles.cart}`}>
              <ShoppingCart size={20} className={styles.icon} />
              <span className={styles.iconText}>Cart</span>
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Navbar;
