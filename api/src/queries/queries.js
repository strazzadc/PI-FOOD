const { getAllRecipesDB, getRecipeByIdDB } = require('./queries_DB');
const { getAllRecipesAPI, getRecipeByIdAPI } = require('./queries_API');

async function getAllRecipes(){
    try{
        let recipes_API = await getAllRecipesAPI();
        let recipes_DB = await getAllRecipesDB();

        let allRecipes = [...recipes_API, ...recipes_DB];

        if(allRecipes.length){
            return allRecipes
        }else{
            alert('Sorry, please come back tomorrow!')
        };
    }catch(error){
        console.log(error);
    };
};

async function getRecipeById(id){
    try{
        let regExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        
        if(regExp.test(id)){
            return await getRecipeByIdDB(id);
        } else {
            return await getRecipeByIdAPI(id);
        };

    }catch(error){
        console.log(error);
    }
};


module.exports = { getAllRecipes, getRecipeById }

