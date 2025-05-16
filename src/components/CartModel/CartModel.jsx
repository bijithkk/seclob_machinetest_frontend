import React, { useContext, useEffect, useState } from 'react';
import styles from './CartModal.module.css';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import { RxCrossCircled } from "react-icons/rx";

const CartModal = ({ isOpen, onClose }) => {
  const { backendUrl, token } = useContext(ProductContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isOpen) return;
      try {
        const response = await axios.get(`${backendUrl}/user/wishlist/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response",response)
        if(response.status === 200){
          setWishlistItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [isOpen, backendUrl, token]);
  
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.heartIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.title}>Items</div>
          <div className={styles.chevronRight}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        <div className={styles.itemsContainer}>
          {wishlistItems.length === 0 ? (
            <div className={styles.empty}>Your wishlist is empty</div>
          ) : (
            wishlistItems.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.productId.image} alt={item.title} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{item.productId.title}</div>
                  <div className={styles.itemPrice}>${item.productId.variants?.[0]?.price.toFixed(2)}</div>
                  <div className={styles.itemRating}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < item.rating ? styles.starFilled : styles.starEmpty}>★</span>
                    ))}
                  </div>
                </div>
                <div className={styles.removeItem}>
                  {/* Add removal logic here later */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>


      </div>
    </div>
  );
};

export default CartModal;