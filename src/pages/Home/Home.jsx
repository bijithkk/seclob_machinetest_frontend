import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Home/Sidebar";
import ProductList from "../../components/Home/ProductList";

const Home = () => {
  return (
    <div className={styles.app}>
      {/* Header */}
      <Navbar />

      <div className={styles.appContainer}>
        <Sidebar />
        <div className={styles.mainContent}>
          <ProductList/>
        </div>
      </div>
    </div>
  );
};

export default Home;
