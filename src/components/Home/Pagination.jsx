// // components/Pagination.jsx
// import React from 'react';
// import styles from './Pagination.module.css';

// const Pagination = ({ currentPage, totalPages, totalItems }) => {
//   return (
//     <div className={styles.paginationContainer}>
//       <div className={styles.itemCount}>
//         <span>{`10 of ${totalItems} items`}</span>
//       </div>

//       <div className={styles.pagination}>
//         {Array(totalPages).fill().map((_, index) => (
//           <button 
//             key={index} 
//             className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
//           >
//             {index + 1}
//           </button>
//         )).slice(0, 5)}
//         <span className={styles.ellipsis}>...</span>
//         <button className={styles.pageButton}>{totalPages}</button>
//       </div>

//       <div className={styles.rowSelector}>
//         <span>Show</span>
//         <div className={styles.dropdown}>
//           <span>10 rows</span>
//           <span className={styles.dropdownArrow}>▼</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange, itemsPerPage }) => {
  const visiblePages = [...Array(Math.min(totalPages, 5)).keys()].map(i => i + 1);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.itemCount}>
        <span>{`${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`}</span>
      </div>

      <div className={styles.pagination}>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && (
          <>
            <span className={styles.ellipsis}>...</span>
            <button
              className={styles.pageButton}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <div className={styles.rowSelector}>
        <span>Show</span>
        <div className={styles.dropdown}>
          <span>{`${itemsPerPage} rows`}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
