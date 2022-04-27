const axios = require('axios');
const { apiKey } = process.env;
const { SPOONACULAR_BASE_PATH } = require('../config/url');
require('dotenv').config();

async function getAllRecipesAPI() {
    try {
        const response = await axios.get(`${SPOONACULAR_BASE_PATH}/complexSearch?number=10&addRecipeInformation=true&apiKey=${apiKey}`)
        const recipes = response.data.results;

        return recipes.map(recipe => (
            {
                id: recipe.id,
                name: recipe.title,
                summary: recipe.summary,
                spoonacularScore: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                instructions: recipe.analyzedInstructions[0]?.steps.map(recipe => { return recipe.step }),
                image: recipe.image,
                diets: recipe.diets.map(diet => ({ name: diet })),
                dishTypes: recipe.dishTypes
            }
        ));

    } catch (error) {
        console.log(error);
    };
};

async function getRecipeByIdAPI(id) {

    try {
        const response = await axios.get(`${SPOONACULAR_BASE_PATH}/${id}/information?apiKey=${apiKey}`)
        const recipe = response.data;

        return  {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
            image: recipe.image,
            diets: recipe.diets.map(diet => ({ name: diet }))
        }
        
    } catch (error) {
        console.log(error)
    }
};

module.exports = { getAllRecipesAPI, getRecipeByIdAPI };
