const axios = require('axios');
const { getAllRecipes, getRecipeById } = require('../queries/queries.js');
const { apiKey } = process.env;
const { SPOONACULAR_BASE_PATH } = require('../config/url');
const { Recipe, Diet } = require('../db');

const getMiddlewareRecipes = async (req, res, next) => {
    const allRecipes = await getAllRecipes();
    const { name } = req.query;

    try {
        if (name) {
            const recipesFinded = allRecipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(name.toString().toLowerCase());
            });
            if (!recipesFinded.length) {
                return res.status(404).send({ msg: "Nonexistent recipe" });
            };
            return res.status(200).send(recipesFinded);
        } else {
            res.status(200).send(allRecipes);
        };
    } catch (error) {
        next(error);
    };
};

const getMiddlewareId = async (req, res, next) => {
    const allRecipes = await getRecipeById(req.params.id);
    const { id } = req.params;

    try {
        
        if (id) {
            if(allRecipes){
                return res.status(200).send(allRecipes);
            }else{
                return res.status(404).send({ msg: "Nonexistent recipe" });
            };    
        };
    } catch (error) {
        next(error);
    };
};

const postMiddlewareRecipe = async (req, res, next) => {
    const { name, summary, spoonacularScore, healthScore, instructions, image, diets} = req.body;
    try {
        
        await Recipe.create({
            name,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            image
        });
        res.status(200).send({msg: 'Recipe created successfully!'});
        
    } catch (error) {
        next(error);
    };
};

const getMiddlewareDiets = async (req, res, next) => {
    let response = await axios.get(`${SPOONACULAR_BASE_PATH}/complexSearch?number=10&addRecipeInformation=true&apiKey=${apiKey}`)
    try {
        let diets = response.data.results.map(recipe => recipe.diets).flat(Infinity);
        let setDiets = [...new Set(diets)];
        setDiets = setDiets.map(diet => {
            return {name: diet}
        });
        
        res.status(200).send(setDiets);
    } catch (error) {
        next(error);
    };
}

module.exports = { getMiddlewareRecipes, getMiddlewareId, postMiddlewareRecipe, getMiddlewareDiets };

// {
// "name": "D",
// "summary": "sgfsdgsd",
// "spoonacularScore": 37,
// "healthScore": 24,
// "instructions": "sgdfd",
// "image": "urlimg"
// }
