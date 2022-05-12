import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import Pagination from '../pagination/Pagination';
import NavBar from './NavBar';
import styles from './Cards.module.css';


export default function AllRecipes(){   
    
    const [currentPage, setCurrentPage] = useState(1);                                                                                  
    const [recipesPerPage] = useState(9);
  
  //Pagination
  const { recipes } = useSelector(state => state) 
  
  const lastRecipe = currentPage * recipesPerPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const currentRecipes = recipes?.slice(firstRecipe, lastRecipe);

  const paginate = pageNumber => setCurrentPage(pageNumber);
   
    return(
        <div className={styles.background}>
            <div>
                <NavBar 
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
                        score={recipe.spoonacularScore}
                        healthScore={recipe.healthScore}
                      />
                    </div>
                ))
                : <div className={styles.gif}>
                    <img src="http://www.gifde.com/js_pics_aux/descarga.php?descarga=si&c=gif/otros/decoracion/cargando-loading/&f=cargando-loading-046.gif" alt='Loading...'></img>
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

