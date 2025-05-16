// components/ActionButtons.jsx
import React, { useState } from 'react';
import styles from './ActionButtons.module.css';
import ProductForm from '../AddProduct/ProductForm';
import AddCategory from '../AddCategory/AddCategory';
import AddSubCategory from '../AddSubCategory/AddSubCategory';

const ActionButtons = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  
  return (
    <>
      <div className={styles.actionButtons}>
        <button className={styles.actionButton} onClick={() => setShowCategoryForm(true)}>Add category</button>
        <button className={styles.actionButton} onClick={() => setShowSubCategoryForm(true)}>Add sub category</button>
        <button className={styles.actionButton} onClick={() => setShowProductForm(true) } >Add product</button>
      </div>

      {showSubCategoryForm && <AddSubCategory onClose={() => setShowSubCategoryForm(false)} />}
      {showCategoryForm && <AddCategory onClose={() => setShowCategoryForm(false)} />}
      {showProductForm && <ProductForm onClose={() => setShowProductForm(false)} />}
    </>
  );
};

export default ActionButtons;