import React, { useState, useRef, useEffect } from 'react';
import styles from './ProductForm.module.css';

const ProductForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [variants, setVariants] = useState([
    { ram: '4 GB', price: '$ 529.99', qty: 1 },
    { ram: '8 GB', price: '$ 929.99', qty: 3 }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('HP');
  const [description, setDescription] = useState('The Ryzen 7 is a more high-end processor that compares to the Int...');
  const [selectedImages, setSelectedImages] = useState([
    '/path/to/image1.jpg',
    '/path/to/image2.jpg'
  ]);
  
  const formRef = useRef(null);
  
  // Close form when clicking outside
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

  const handleAddVariant = () => {
    // Logic to add new variant
    console.log('Add variant clicked');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
    console.log('Form submitted', { title, variants, selectedCategory, description });
    onClose();
  };

  const handleDiscard = () => {
    onClose();
  };

  const increaseQty = (index) => {
    const newVariants = [...variants];
    newVariants[index].qty += 1;
    setVariants(newVariants);
  };

  const decreaseQty = (index) => {
    const newVariants = [...variants];
    if (newVariants[index].qty > 1) {
      newVariants[index].qty -= 1;
      setVariants(newVariants);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={formRef}>
        <h2 className={styles.modalTitle}>Add Product</h2>

        <div className={styles.formGroup}>
          <label>Title :</label>
          <input 
            type="text" 
            value={title || 'HP AMD Ryzen 3'} 
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
                  <button type="button" onClick={() => decreaseQty(index)}>{'<'}</button>
                  <span>{variant.qty}</span>
                  <button type="button" onClick={() => increaseQty(index)}>{'>'}</button>
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
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.formSelect}
            >
              <option value="HP">HP</option>
              <option value="Dell">Dell</option>
              <option value="Lenovo">Lenovo</option>
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
            <div className={styles.uploadPlaceholder}>
              <span>+</span>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button 
            type="button" 
            className={styles.addButton} 
            onClick={handleSubmit}
          >
            ADD
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