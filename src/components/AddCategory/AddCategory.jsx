import React, { useRef, useEffect } from 'react';
import styles from './AddCategory.module.css';

const AddCategory = ({ onClose }) => {
  const formRef = useRef(null);
  
  // Handle clicking outside the form to close it
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your category submission logic here
    console.log('Category form submitted');
    onClose();
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
        //   value={categoryName}
        //   onChange={(e) => setCategoryName(e.target.value)}
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