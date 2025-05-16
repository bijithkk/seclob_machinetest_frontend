import React from "react";
import { User } from 'lucide-react';
import styles from './InputField.module.css';

const InputField = ({type,placeholder,Icon,value,onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <Icon className={styles.inputIcon} size={20} />
      <input type={type} placeholder={placeholder} className={styles.input} value={value} 
      onChange={onChange}  />
    </div>
  );
};

export default InputField;
