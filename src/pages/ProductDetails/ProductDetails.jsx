// ProductPage.jsx
import React, { useState } from 'react';
import styles from './ProductDetails.module.css';
import laptopImage from '../../assets/laptop.jpg';
// import heartIcon from './assets/heart-icon.svg';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState('4 GB');

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleRamSelection = (ram) => {
    setSelectedRam(ram);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Home</span>
        <span className={styles.breadcrumbSeparator}>{'>'}</span>
        <span className={styles.breadcrumbItem}>Product details</span>
      </div>
      
      <div className={styles.productContainer}>
        <div className={styles.productImagesSection}>
          <div className={styles.mainImageContainer}>
            <img src={laptopImage} alt="HP AMD Ryzen 3 Laptop" className={styles.mainImage} />
          </div>
          
          <div className={styles.thumbnailsContainer}>
            <div className={styles.thumbnailItem}>
              <img src={laptopImage} alt="HP AMD Ryzen 3 Laptop Thumbnail 1" className={styles.thumbnailImage} />
            </div>
            <div className={styles.thumbnailItem}>
              <img src={laptopImage} alt="HP AMD Ryzen 3 Laptop Thumbnail 2" className={styles.thumbnailImage} />
            </div>
          </div>
        </div>
        
        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>HP AMD Ryzen 3</h1>
          <p className={styles.productPrice}>$529.99</p>
          
          <div className={styles.availability}>
            <span className={styles.availabilityLabel}>Availability:</span>
            <span className={styles.inStock}>
              <span className={styles.checkIcon}>✓</span> In stock
            </span>
          </div>
          
          <p className={styles.stockWarning}>Hurry up! only 34 product left in stock!</p>
          
          <div className={styles.divider}></div>
          
          <div className={styles.ramSelection}>
            <span className={styles.optionLabel}>Ram:</span>
            <div className={styles.ramOptions}>
              <button 
                className={`${styles.ramOption} ${selectedRam === '4 GB' ? styles.ramOptionSelected : ''}`}
                onClick={() => handleRamSelection('4 GB')}
              >
                4 GB
              </button>
              <button 
                className={`${styles.ramOption} ${selectedRam === '8 GB' ? styles.ramOptionSelected : ''}`}
                onClick={() => handleRamSelection('8 GB')}
              >
                8 GB
              </button>
              <button 
                className={`${styles.ramOption} ${selectedRam === '16 GB' ? styles.ramOptionSelected : ''}`}
                onClick={() => handleRamSelection('16 GB')}
              >
                16 GB
              </button>
            </div>
          </div>
          
          <div className={styles.quantitySelector}>
            <span className={styles.optionLabel}>Quantity:</span>
            <div className={styles.quantityControls}>
              <button className={styles.quantityButton} onClick={decreaseQuantity}>-</button>
              <input 
                type="text" 
                className={styles.quantityInput} 
                value={quantity} 
                readOnly 
              />
              <button className={styles.quantityButton} onClick={increaseQuantity}>+</button>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={styles.editButton}>Edit product</button>
            <button className={styles.buyButton}>Buy it now</button>
            <button className={styles.wishlistButton}>
              {/* <img src={heartIcon} alt="Add to wishlist" className={styles.heartIcon} /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;