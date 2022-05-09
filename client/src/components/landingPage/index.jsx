import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';

export default function LandingPage() {


    return (
        <div className={styles.background}>  
                <h1 className={styles.title}>Henry Food</h1>
                <NavLink to='/home'>
                    <button className={styles.button}>Let's eat!</button>
                </NavLink>
        </div>
    )
};





// let dispatch = useDispatch();
//     let recipes = useSelector(state => state.recipes);

//     useEffect(()=>{
//         if(recipes.length === 0 ) dispatch(getRecipes())
//     },[])