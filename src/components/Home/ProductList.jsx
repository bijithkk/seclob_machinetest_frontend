// ProductList.jsx
import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import ActionButtons from './ActionButtons';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { ProductContext } from '../../context/ProductContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
  if (products && products.length > 0) {
    setLoading(false);
  }
}, [products]);

  return (
    <div className={styles.container}>
    {loading ? (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    ) : (
      <>
        <ActionButtons />
        <div className={styles.productGrid}>
          {currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={(page) => setCurrentPage(page)}
          itemsPerPage={itemsPerPage}
        />
      </>
    )}
  </div>
  );
};

export default ProductList;