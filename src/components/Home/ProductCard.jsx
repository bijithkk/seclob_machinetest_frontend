// components/ProductCard.jsx
import React, { useContext, useState } from "react";
import styles from "./ProductCard.module.css";
import { ProductContext } from "../../context/ProductContext";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const ProductCard = ({ product }) => {
  const { navigate, backendUrl, token } = useContext(ProductContext);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        // Remove from wishlist
        await axios.delete(`${backendUrl}/user/wishlist/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            productId: product._id,
          },
        });
        setIsWishlisted(false);
      } else {
        // Add to wishlist
        await axios.post(
          `${backendUrl}/user/wishlist/add`,
          {
            productId: product._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className={styles.productCard}
    >
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <button className={styles.favoriteButton} onClick={toggleWishlist}>
          <FaHeart color={isWishlisted ? "red" : "white"} />
        </button>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.title}</h3>
        <p className={styles.productPrice}>${product.variants[0].price}</p>
        <div className={styles.ratingContainer}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className={`${styles.star} ${
                  i < product.rating ? styles.filledStar : ""
                }`}
              >
                ★
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
