// components/ProductCard.jsx
import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage} 
        />
        <button className={styles.favoriteButton}>
          <span className={styles.favoriteIcon}>○</span>
        </button>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>${product.price}</p>
        <div className={styles.ratingContainer}>
          {Array(5).fill().map((_, i) => (
            <span 
              key={i} 
              className={`${styles.star} ${i < product.rating ? styles.filledStar : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;