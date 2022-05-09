import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ recipesPerPage, allRecipes, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.paginado}>
        {pageNumbers.length > 1 && pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)} >{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//to='/home'