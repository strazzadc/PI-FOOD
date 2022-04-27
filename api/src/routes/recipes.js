const { Router } = require('express');

const router = Router();
const { getMiddlewareRecipes, getMiddlewareId, postMiddlewareRecipe, getMiddlewareDiets } = require('../middlewares/recipes');

router.get('/', getMiddlewareRecipes);
router.get('/types', getMiddlewareDiets);
router.get('/:id', getMiddlewareId);
router.post('/', postMiddlewareRecipe);

module.exports = router;