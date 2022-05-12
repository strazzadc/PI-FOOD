import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './RecipeCard.module.css';

export default function RecipeCard({ id, name, image, dishes, diets, score, healthScore }) {

    return (
        <div className={styles.card}>
            <NavLink to={`/recipes/${id}`} className={styles.name} >{name}</NavLink>
            <img src={image} alt='Img not Found' className={styles.image} />
            <div className={styles.textContainer}>
                <h4 className={styles.title}>
                    <b>Dish type: </b>
                </h4>
                <p className={styles.dishes}>{dishes}</p>

                <div className={styles.puntuation}>
                    <h4 className={styles.titlePoints}>
                        <b>Score: </b>
                    </h4>
                    <p className={styles.score}>{score}</p>

                    <h4 className={styles.titlePoints}>
                        <b>Healthy Score: </b>
                    </h4>
                    <p className={styles.score}>{healthScore}</p>
                </div>

                <div className={styles.divDiet}>
                    <h4 className={styles.title}>
                        <b>Diets: </b>
                    </h4>
                    <p className={styles.diets}>{diets}</p>
                </div>
            </div>
             
        </div>
    )
};


