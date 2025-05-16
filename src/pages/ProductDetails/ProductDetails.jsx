// ProductPage.jsx
import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import Navbar from "../../components/Navbar";
import ProductForm from "../../components/AddProduct/ProductForm";

const ProductDetails = () => {
  const { getProductById } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState("");
  const [showEditProductForm, setShowEditProductForm] = useState(false); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
        if (data.product.image && data.product.image.length > 0) {
          setMainImage(data.product.image[0]);
        }
        if (data.product.variants && data.product.variants.length > 0) {
          setSelectedRam(data.product.variants[0].ram);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleRamSelection = (ram) => {
    setSelectedRam(ram);
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Home</span>
        <span className={styles.breadcrumbSeparator}>{">"}</span>
        <span className={styles.breadcrumbItem}>Product details</span>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.productImagesSection}>
          <div className={styles.mainImageContainer}>
            <img
              src={mainImage}
              alt="HP AMD Ryzen 3 Laptop"
              className={styles.mainImage}
            />
          </div>

          <div className={styles.thumbnailsContainer}>
            {product.image?.slice(1).map((img, index) => (
              <div
                key={index}
                className={styles.thumbnailItem}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.title} Thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productPrice}>
            $
            {product.variants?.find((variant) => variant.ram === selectedRam)
              ?.price ?? "N/A"}
          </p>

          <div className={styles.availability}>
            <span className={styles.availabilityLabel}>Availability:</span>
            <span className={styles.inStock}>
              <span className={styles.checkIcon}>✓</span> In stock
            </span>
          </div>

          <p className={styles.stockWarning}>
            Hurry up! only 34 product left in stock!
          </p>

          <div className={styles.divider}></div>

          <div className={styles.ramSelection}>
            <span className={styles.optionLabel}>Ram:</span>
            <div className={styles.ramOptions}>
              {product.variants &&
                product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`${styles.ramOption} ${
                      selectedRam === variant.ram
                        ? styles.ramOptionSelected
                        : ""
                    }`}
                    onClick={() => handleRamSelection(variant.ram)}
                  >
                    {variant.ram}
                  </button>
                ))}
            </div>
          </div>

          <div className={styles.quantitySelector}>
            <span className={styles.optionLabel}>Quantity:</span>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                type="text"
                className={styles.quantityInput}
                value={quantity}
                readOnly
              />
              <button
                className={styles.quantityButton}
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={() => setShowEditProductForm(true) }>Edit product</button>
            <button className={styles.buyButton}>Buy it now</button>
            <button className={styles.wishlistButton}>
              {/* <img src={heartIcon} alt="Add to wishlist" className={styles.heartIcon} /> */}
            </button>
          </div>
        </div>
      </div>
    </div>

    {showEditProductForm && <ProductForm product={product} onClose={() => setShowEditProductForm(false)} onUpdate={(updatedProduct) => setProduct(updatedProduct)}/>}
    </>
  );
};

export default ProductDetails;
