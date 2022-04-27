const { Recipe, Diet } = require('../db.js');

async function getAllRecipesDB(){
    try{
        return await Recipe.findAll({
            attributes: ['id', 'name', 'summary', 'spoonacularScore', 'healthScore', 'steps', 'image'],
            include: {
                model: Diet,
                attributes: ['name']
            }
        });  
        
    }catch(error){
        console.log(error);
        return []; // smell 
    }
};

async function getRecipeByIdDB(id){
    try{
        return await Recipe.findByPk(id, {
            attributes: ['id', 'name', 'summary', 'spoonacularScore', 'healthScore', 'steps', 'image'],
            include: {
                model: Diet,
                attributes: ['name']
            }
        });
        
    }catch(error){
        console.log(error);
        return '';  //smell
    }
};

module.exports = { getAllRecipesDB, getRecipeByIdDB };