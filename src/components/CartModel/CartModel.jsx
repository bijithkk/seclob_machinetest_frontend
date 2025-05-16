import React from 'react';
import styles from './CartModal.module.css';

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const cartItems = [
    {
      id: 1,
      name: 'HP AMD Ryzen 3',
      price: 529.99,
      image: '/laptop-image.jpg', // Replace with actual image path
      rating: 5
    },
    {
      id: 2,
      name: 'HP AMD Ryzen 3',
      price: 529.99,
      image: '/laptop-image.jpg', // Replace with actual image path
      rating: 3
    }
  ];

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
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                <div className={styles.itemRating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < item.rating ? styles.starFilled : styles.starEmpty}>★</span>
                  ))}
                </div>
              </div>
              <div className={styles.removeItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartModal;