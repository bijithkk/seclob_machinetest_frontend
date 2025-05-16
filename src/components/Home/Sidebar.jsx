import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [laptopExpanded, setLaptopExpanded] = useState(true);
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.navigationItem}>
        <span>Home</span>
        <span className={styles.chevron}>›</span>
      </div>
      
      <h3 className={styles.categoryTitle}>Categories</h3>
      
      <ul className={styles.categoryList}>
        <li className={styles.categoryItem}>All categories</li>
        
        <li className={`${styles.categoryItem} ${styles.hasChildren}`}>
          <div 
            className={styles.categoryHeader}
            onClick={() => setLaptopExpanded(!laptopExpanded)}
          >
            <span>Laptop</span>
            <span className={`${styles.chevron} ${laptopExpanded ? styles.expanded : ''}`}>
              ›
            </span>
          </div>
          
          {laptopExpanded && (
            <ul className={styles.subCategories}>
              <li className={styles.subCategory}>
                <div className={styles.checkboxContainer}>
                  <div className={styles.checkbox}>
                    <div className={styles.checkmark}>✓</div>
                  </div>
                  <span>Hp</span>
                </div>
              </li>
              <li className={styles.subCategory}>
                <div className={styles.checkboxContainer}>
                  <div className={`${styles.checkbox} ${styles.unchecked}`}></div>
                  <span>Dell</span>
                </div>
              </li>
            </ul>
          )}
        </li>
        
        <li className={`${styles.categoryItem} ${styles.hasChildren}`}>
          <div className={styles.categoryHeader}>
            <span>Tablet</span>
            <span className={styles.chevron}>›</span>
          </div>
        </li>
        
        <li className={`${styles.categoryItem} ${styles.hasChildren}`}>
          <div className={styles.categoryHeader}>
            <span>Headphones</span>
            <span className={styles.chevron}>›</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;