// ProductList.jsx
import React from 'react';
import styles from './ProductList.module.css';
import laptopImage from '../../assets/laptop.jpg'; // You'll need to add an image file to your project
import ActionButtons from './ActionButtons';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ProductList = () => {
  // Mock data for the products (6 identical products as shown in the image)
  const products = Array(6).fill({
    id: 1,
    name: 'HP AMD Ryzen 3',
    price: 529.99,
    image: laptopImage,
    rating: 0, // 0 out of 5 based on the image
  });

  // Mock data for pagination
  const currentPage = 1;
  const totalPages = 10;
  const totalItems = 456;

  return (
    <div className={styles.container}>
      <ActionButtons/>
      <div className={styles.productGrid}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} />
    </div>
  );
};

export default ProductList;