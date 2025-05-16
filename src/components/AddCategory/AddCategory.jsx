import React, { useRef, useEffect, useContext, useState } from 'react';
import styles from './AddCategory.module.css';
import { ProductContext } from '../../context/ProductContext';
import { toast } from 'react-toastify';

const AddCategory = ({ onClose }) => {
  const formRef = useRef(null);
  const { addCategory } = useContext(ProductContext);
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      await addCategory(categoryName.trim());
      toast.success("category added successfully",{autoClose: 1500});
      onClose();
    } catch (error) {
      console.log("error",error);
    }
  };

   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add Category</h2>
        
        <input
          type="text"
          className={styles.categoryInput}
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.addButton}
            onClick={handleSubmit}
          >
            ADD
          </button>
          <button 
            className={styles.discardButton}
            onClick={onClose}
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;