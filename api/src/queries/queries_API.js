const axios = require('axios');
const { apiKey } = process.env;
const { SPOONACULAR_BASE_PATH } = require('../config/url');
require('dotenv').config();

async function getAllRecipesAPI() {
    try {
        const response = await axios.get(`${SPOONACULAR_BASE_PATH}/complexSearch?number=100&addRecipeInformation=true&apiKey=${apiKey}`)
        const recipes = response.data.results;
        
        return recipes ?
        recipes.map(recipe => (
            {
                id: recipe.id,
                name: recipe.title,
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.analyzedInstructions[0]?.steps.map(step => { return step.step }).join(' \n'),
                image: recipe.image,
                diets: recipe.diets?.map(diet => diet).join(', '),
                dishTypes: recipe.dishTypes?.map(dish => dish).join(', ')
            }
        )) : [];

    } catch (error) {
        console.log(error);
    };
};

async function getRecipeByIdAPI(id) {

    try {
        const response = await axios.get(`${SPOONACULAR_BASE_PATH}/${id}/information?apiKey=${apiKey}`)
        const recipe = response.data;
        
        return  recipe ? {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
            image: recipe.image,
            diets: recipe.diets.map(diet => diet).join(', '),
            dishTypes: recipe.dishTypes?.map(dish => dish).join(', '),
            instructions: recipe.analyzedInstructions[0]?.steps.map(recipe => { return recipe.step }).join(' \n')
        } : {}
        
    } catch (error) {
        console.log(error)
    }
};

module.exports = { getAllRecipesAPI, getRecipeByIdAPI };
