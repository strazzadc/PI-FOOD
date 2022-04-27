const { Router } = require('express');
const recipesRoute = require('./recipes.js');

const router = Router();

router.use('/recipes', recipesRoute);

module.exports = router;
