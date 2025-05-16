import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./ProductForm.module.css";
import { ProductContext } from "../../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ onClose, product, onUpdate }) => {
  const {
    getAllSubcategories,
    allSubcategories,
    backendUrl,
    token,
    getProductsData,
    getProductById,
  } = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [variants, setVariants] = useState([
    { ram: "", price: "", quantity: 1 },
  ]);

  const [selectedSubcategory, setSelectedSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { ram: "", price: "", quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subCategory", selectedSubcategory);
      formData.append("description", description);
      formData.append("variants", JSON.stringify(variants));

      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach((file, index) => {
          formData.append(`image${index + 1}`, file);
        });
      }

      let response;
      if (product && product._id) {
        response = await axios.patch(
          `${backendUrl}/user/product/update/${product._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          backendUrl + "/user/product/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        getProductsData(token);
        toast.success("Product added successfully");

        let updatedProduct = product;
        if (product && product._id) {
          const res = await getProductById(product._id);
          updatedProduct = res.product;
          if (onUpdate) {
            onUpdate(updatedProduct);
          }
        }

        onClose();
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      console.error(
        "Error details:",
        error.response?.data || "No response data"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const handleDiscard = () => {
    onClose();
  };

  const increaseQty = (index) => {
    const newVariants = [...variants];
    newVariants[index].quantity += 1;
    setVariants(newVariants);
  };

  const decreaseQty = (index) => {
    const newVariants = [...variants];
    if (newVariants[index].quantity > 1) {
      newVariants[index].quantity -= 1;
      setVariants(newVariants);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Open file dialog
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  useEffect(() => {
    getAllSubcategories();
  }, []);

  useEffect(() => {
    if (allSubcategories?.length > 0 && !selectedSubcategory) {
      setSelectedSubCategory(allSubcategories[0]._id);
    }
  }, [allSubcategories]);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setSelectedSubCategory(product.subCategory || "");

      if (product.variants && product.variants.length > 0) {
        setVariants(
          product.variants.map((v) => ({
            ram: v.ram || "",
            price: v.price || "",
            quantity: v.quantity || 1,
          }))
        );
      } else {
        setVariants([{ ram: "", price: "", quantity: 1 }]);
      }

      if (product.image && product.image.length > 0) {
        setSelectedImages(product.image); // Assuming image URLs are stored here
      } else {
        setSelectedImages([]);
      }
    }
  }, [product]);

  return (
    <div className={styles.modalOverlay}>
      {loading && (
        <div className={styles.spinnerOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div className={styles.modalContent} ref={formRef}>
        <h2 className={styles.modalTitle}>
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className={styles.formGroup}>
          <label>Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formInput}
          />
        </div>

        <div className={styles.variantsSection}>
          <label>Variants :</label>

          {variants.map((variant, index) => (
            <div key={index} className={styles.variantRow}>
              <div className={styles.variantInput}>
                <label>Ram:</label>
                <input
                  type="text"
                  value={variant.ram}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].ram = e.target.value;
                    setVariants(newVariants);
                  }}
                />
              </div>

              <div className={styles.variantInput}>
                <label>Price:</label>
                <input
                  type="text"
                  value={variant.price}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].price = e.target.value;
                    setVariants(newVariants);
                  }}
                />
              </div>

              <div className={styles.qtyControl}>
                <label>QTY:</label>
                <div className={styles.qtyButtons}>
                  <button type="button" onClick={() => decreaseQty(index)}>
                    {"<"}
                  </button>
                  <span>{variant.quantity}</span>
                  <button type="button" onClick={() => increaseQty(index)}>
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addVariantsButton}
            onClick={handleAddVariant}
          >
            Add variants
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Sub category :</label>
          <div className={styles.selectWrapper}>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className={styles.formSelect}
            >
              {allSubcategories?.map((subcate) => (
                <option key={subcate._id} value={subcate._id}>
                  {subcate.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Upload image:</label>
          <div className={styles.imageUpload}>
            {selectedImages.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={image} alt="Preview" />
              </div>
            ))}
            {selectedImages.length < 3 && (
              <div
                className={styles.uploadPlaceholder}
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              >
                <span>+</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleSubmit}
          >
            {product ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className={styles.discardButton}
            onClick={handleDiscard}
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
