import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import Pagination from '../pagination/Pagination';
import NavBar from './NavBar';
import styles from './Cards.module.css';
import { NavLink } from 'react-router-dom';

export default function AllRecipes({setCurrentPage, currentPage}){   
    
  const [recipesPerPage] = useState(9);
  
  const [order, setOrder] = useState('');
  const [orderScore, setOrderScore] = useState('');
  const [orderHscore, setOrderHealthyScore] = useState('');
  const [orderDiets, setOrderDiets] = useState('');
  
  
  //Pagination
  const { recipes } = useSelector(state => state) 
  
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return(
        <div className={styles.background}>
            <div>
                <NavBar setOrder = {setOrder} 
                        setOrderScore = { setOrderScore} 
                        setOrderHealthyScore = {setOrderHealthyScore}
                        setOrderDiets = {setOrderDiets}
                        setCurrentPage = {setCurrentPage}
                        currentPage = {currentPage}
                />
            </div>
            <div className={styles.cards}>    
            { currentRecipes.length ?
                currentRecipes.map(recipe => (    
                    <div key={recipe.id}>
                      <RecipeCard 
                        id={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        dishes={recipe.dishTypes ? recipe.dishTypes : 'unknown'} 
                        diets={recipe.diets ? recipe.diets : 'unknown'} 
                      />
                    </div>
                ))
                : <div className={styles.gif}>
                    <img src="http://www.gifde.com/js_pics_aux/descarga.php?descarga=si&c=gif/otros/decoracion/cargando-loading/&f=cargando-loading-046.gif"></img>
                </div>
            }
            </div>
            <Pagination 
                recipesPerPage={recipesPerPage} 
                allRecipes={recipes.length} 
                paginate={paginate} 
                currentPage={currentPage}
            />
        </div>
    )
};

