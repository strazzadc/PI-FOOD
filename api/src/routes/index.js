const { Router } = require('express');
const recipesRoute = require('./recipes.js');
const dietsRoute = require('./diets.js');

const router = Router();

router.use('/recipes', recipesRoute);
router.use('/types', dietsRoute);

module.exports = router;
