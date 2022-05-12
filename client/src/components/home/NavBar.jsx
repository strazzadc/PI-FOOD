import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';
import { sortAZ, sortScore, sortHealthyScore, getDiets, sortDiet, getRecipes, clear } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import styles from './NavBar.module.css';


export default function NavBar({ setCurrentPage }) {

    const dispatch = useDispatch();
    const [diets, setDiets] = useState([]);
    

    useEffect(() => {
        getDiets().then(response => setDiets(response));

        return () => {
            dispatch(clear())
        }  
    }, [dispatch]);

    let handleClickHome = (e) => {
        e.preventDefault();
        dispatch(getRecipes());
        setCurrentPage(1);
        dispatch(clear())
    };

    let handleChange = (e) => {
        e.preventDefault();
        dispatch(sortAZ(e.target.value));
        setCurrentPage(1);
    };

    let handleChangeScore = (e) => {
        e.preventDefault();
        dispatch(sortScore(e.target.value));
        setCurrentPage(1);
    };

    let handleChangeHealthyScore = (e) => {
        e.preventDefault();
        dispatch(sortHealthyScore(e.target.value));
        setCurrentPage(1);
    };

    let handleChangeDiet = (e) => {
        e.preventDefault();
        dispatch(sortDiet(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div className={styles.navbar}>
                <ul className={styles.elements}>
                    
                    <li>
                        <button onClick={handleClickHome} className={styles.links} >
                            Reload
                        </button>
                    </li>
                    <li>
                        <NavLink to='/create' >
                            <button className={styles.links} >
                                Create new recipe
                            </button>
                        </NavLink>
                    </li>
                    

                    
                    <li className={styles.contentSelect}>
                        <select defaultValue='sort A-Z' onChange={handleChange}>
                            <option value='sort A-Z' disabled hidden>sort AZ</option>
                            <option value='upward'>A-Z</option>
                            <option value='falling'>Z-A</option>
                        </select>
                    </li>

                    <li className={styles.contentSelect}>
                        <select defaultValue='sort by SCORE' onChange={handleChangeScore}>
                            <option value='sort by SCORE' disabled hidden>sort SCORE</option>
                            <option value='upward'>sort upward</option>
                            <option value='falling'>sort falling</option>
                        </select>
                    </li>

                    <li className={styles.contentSelect}>
                        <select defaultValue='sort by HEALTH SCORE' onChange={handleChangeHealthyScore}>
                            <option value='sort by HEALTH SCORE' disabled hidden>sort HEALTH</option>
                            <option value='upward'>sort upward</option>
                            <option value='falling'>sort falling</option>
                        </select>
                    </li>

                    <li className={styles.contentSelect}>
                        <select defaultValue='sort by DIET' onChange={handleChangeDiet}>
                            <option value='sort by DIET' disabled hidden>sort by DIET</option>
                            {diets.map(({ name }, index) => {
                                return (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                );
                            })};
                        </select>
                    </li>
                    
                </ul>
                <div className={styles.searchBar}>
                    <SearchBar />
                </div>
            </div>
        </>
    );
};