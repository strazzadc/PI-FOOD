const { getAllRecipes, getRecipeById } = require('../queries/queries.js');
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
                return res.status(404).send({msg: 'Please, insert a valid recipe'});
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

    const { name, summary, spoonacularScore, healthScore, instructions, image, dishTypes, diets} = req.body;
    try {
        
        const newRecipe = await Recipe.create({
            name,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            image,
            dishTypes
        });
        
        let newDiet = await Diet.findAll({
            where: {
                name: diets
            }
        });
        
        newRecipe.addDiet(newDiet);
        
        res.status(200).send({msg: 'Recipe created successfully!'});

    } catch (error) {
        next(error);
    };
};

module.exports = { getMiddlewareRecipes, getMiddlewareId, postMiddlewareRecipe };


