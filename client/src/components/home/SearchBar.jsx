import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from '../../redux/actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(name.length){
      dispatch(searchRecipe(name));
      setName('');
    } else{
      alert('Please, insert an ingredient or a recipe to search')
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Recipe or ingredient" value={name} onChange={handleChange} className={styles.input} />
        <input type="submit" value="Search" className={styles.button} />
      </div>
    </form>
  );
}