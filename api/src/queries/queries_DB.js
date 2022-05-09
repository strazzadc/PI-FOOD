const { Recipe, Diet } = require('../db.js');

async function getAllRecipesDB(){
    try{
        let response = await Recipe.findAll({
            attributes: ['id', 'name', 'summary', 'spoonacularScore', 'healthScore', 'instructions', 'image', 'dishTypes'],
            include: {
                model: Diet,
                attributes: ['name']
            }
        });  
        
        let dietTransformation = [];
        response.forEach(item => {
            const { id, name, summary, spoonacularScore, healthScore, instructions, image, dishTypes } = item
            const dietName = item.Diets.map(el => el.name)
            const dietsNames = dietName.join(', ')
            dietTransformation.push({id, name, summary, spoonacularScore, healthScore, instructions, image, dishTypes, diets: dietsNames})
        });
        
        return dietTransformation;
    }catch(error){
        console.log(error);
    }
};

async function getRecipeByIdDB(id){
    try{
        let response = await Recipe.findByPk(id, {
            attributes: ['id', 'name', 'summary', 'spoonacularScore', 'healthScore', 'instructions', 'image', 'dishTypes'],
            include: {
                model: Diet,
                attributes: ['name']
            }
        });
        const arr = [];
        arr.push(response)
        let dietTransformation = [];
        arr.forEach(item => {
            const { id, name, summary, spoonacularScore, healthScore, instructions, image, dishTypes } = item
            const dietName = item.Diets.map(el => el.name)
            const dietsNames = dietName.join(', ')
            dietTransformation.push({id, name, summary, spoonacularScore, healthScore, instructions, image, dishTypes, diets: dietsNames})
        });
        
        return dietTransformation[0]
    }catch(error){
        console.log(error);
    }
};

module.exports = { getAllRecipesDB, getRecipeByIdDB };