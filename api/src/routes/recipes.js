const { Router } = require('express');

const router = Router();
const { getMiddlewareRecipes, getMiddlewareId, postMiddlewareRecipe } = require('../middlewares/recipes');

router.get('/', getMiddlewareRecipes);
router.get('/:id', getMiddlewareId);
router.post('/', postMiddlewareRecipe);

module.exports = router;