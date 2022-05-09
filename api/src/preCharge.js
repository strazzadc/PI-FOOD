const axios = require('axios');
const { apiKey } = process.env;
const { SPOONACULAR_BASE_PATH } = require('./config/url');
const { Diet } = require('./db')

const getMiddlewareDiets = async (req, res, next) => {
    let response = await axios.get(`${SPOONACULAR_BASE_PATH}/complexSearch?number=100&addRecipeInformation=true&apiKey=${apiKey}`)
    try {

        let diets = response.data.results.map(recipe => recipe.diets).flat(Infinity);
        let setDiets = [...new Set(diets)];
        setDiets = setDiets.map(diet => {return {name: diet} });  
        await Diet.bulkCreate(setDiets);
        
    } catch (error) {
        console.log(error);
    };
};

module.exports = { getMiddlewareDiets }