const axios = require('axios');
const { Diet } = require('./db');

async function preCharge(){
    const dataType = await axios.get('http://localhost:3001/recipes/types');
    await Diet.bulkCreate(dataType.data);
};

module.exports = { preCharge }