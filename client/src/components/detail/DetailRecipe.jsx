//import NavBar from '../home/NavBar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProductDetail } from '../../redux/actions';
import styles from './DetailRecipe.module.css';

export default function Detail() {

    const { id } = useParams()

    const dispatch = useDispatch();

    const { recipeDetail } = useSelector(state => state)

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    return (
        <div>
            
            {recipeDetail ?
                (<div className={styles.cardDetail}>
                    <NavLink to='/home'>
                        <button className={styles.buttonHome1}>x</button>
                    </NavLink>
                    <div className={styles.info}>
                        <h3><b>Recipe Detail</b></h3>

                        <h2 className={styles.name}>{recipeDetail.name}</h2>

                        <img src={recipeDetail.image} alt={recipeDetail.name} className={styles.image} />
                        
                        <div className={styles.divs}>
                            <b >Score: </b>{recipeDetail.spoonacularScore}
                        </div>
                       
                        <div className={styles.divs}>
                            <b>Healthy Score: </b>{recipeDetail.healthScore}
                        </div>

                        <div className={styles.divs}>
                            <b>Dish type: </b>{recipeDetail.dishTypes ? recipeDetail.dishTypes : 'unknown'}
                        </div>

                        <div className={styles.divs}>
                            <b>Diets: </b>{recipeDetail.diets ? recipeDetail.diets : 'unknown'}
                        </div>

                        <b>Summary: </b><p className={styles.divs} dangerouslySetInnerHTML={{ __html: recipeDetail.summary }} />
                        
                        <p className={styles.divs}>
                            <b>Steps: </b>{recipeDetail.instructions ? recipeDetail.instructions : 'unknown'}
                        </p>
                    </div>
                </div>)
                : (<span>Loading...</span>)
            }
        </div>
    )
};