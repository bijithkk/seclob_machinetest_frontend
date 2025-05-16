import React, { useContext, useState } from "react";
import styles from "./Sidebar.module.css";
import { ProductContext } from "../../context/ProductContext";

const Sidebar = () => {
  const {
    categoryData,
    getSubCategories,
    subCategoryMap,
    filterProductsBySubcategory,
    getProductsData,
    token
  } = useContext(ProductContext);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryClick = async (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      if (!subCategoryMap[categoryId]) {
        await getSubCategories(categoryId);
      }
    }
  };

  const handleSubCategoryClick = async (subCategoryId) => {
  if (selectedSubCategory === subCategoryId) {
    setSelectedSubCategory(null);
    await getProductsData(token); // 👈 Restore all products
  } else {
    setSelectedSubCategory(subCategoryId);
    await filterProductsBySubcategory(subCategoryId);
  }
};

  return (
    <div className={styles.sidebar}>
      <div className={styles.navigationItem}>
        <span>Home</span>
        <span className={styles.chevron}>›</span>
      </div>

      <h3 className={styles.categoryTitle}>Categories</h3>

      <ul className={styles.categoryList}>
        <li className={styles.categoryItem}>All categories</li>

        {categoryData.map((cat) => (
          <li
            key={cat._id}
            className={`${styles.categoryItem} ${styles.hasChildren}`}
          >
            <div
              className={styles.categoryHeader}
              onClick={() => handleCategoryClick(cat._id)}
            >
              <span>{cat.name}</span>
              <span
                className={`${styles.chevron} ${
                  expandedCategory === cat._id ? styles.expanded : ""
                }`}
              >
                ›
              </span>
            </div>

            {expandedCategory === cat._id && subCategoryMap[cat._id] && (
              <ul className={styles.subCategories}>
                {subCategoryMap[cat._id].map((sub) => (
                  <li key={sub._id} className={styles.subCategory}>
                    <div
                      className={styles.checkboxContainer}
                      onClick={() => handleSubCategoryClick(sub._id)}
                    >
                      <div className={styles.checkbox}>
                        {selectedSubCategory === sub._id && (
                        <div className={styles.checkmark}>✓</div>
                        )}
                      </div>
                      <span>{sub.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
