import React, { useState, useRef, useEffect } from "react";
import styles from "./AddSubCategory.module.css";

const AddSubCategory = ({ onClose }) => {
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

        <div className={styles.formGroup}>
          <div className={styles.selectWrapper}>
            <select className={styles.select}>
              <option value="" disabled>
                Select category
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
            <div className={styles.arrow}></div>
          </div>
        </div>

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
          <button className={styles.addButton} onClick={handleSubmit}>
            ADD
          </button>
          <button className={styles.discardButton} onClick={onClose}>
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
