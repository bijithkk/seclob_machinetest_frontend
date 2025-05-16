import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./AddSubCategory.module.css";
import { ProductContext } from "../../context/ProductContext";

const AddSubCategory = ({ onClose }) => {
  const formRef = useRef(null);
  const { categoryData, addSubCategory } = useContext(ProductContext);
  console.log("categoryData", categoryData);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId || !subCategoryName.trim()) {
      alert("Please select a category and enter a subcategory name.");
      return;
    }

    try {
      await addSubCategory(selectedCategoryId, subCategoryName.trim());
      onClose(); // Close modal after success
    } catch (error) {
      console.log("error",error)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add SubCategory</h2>

        <div className={styles.formGroup}>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              {categoryData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className={styles.arrow}></div>
          </div>
        </div>

        <input
          type="text"
          className={styles.categoryInput}
          placeholder="Enter category name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
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
