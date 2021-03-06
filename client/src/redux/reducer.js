import {
  GET_RECIPES,
  CLEAR,
  GET_DIET,
  GET_PRODUCT_DETAIL,
  CREATE_RECIPE,
  SEARCH_RECIPE,
  SORT_AZ,
  SORT_SCORE,
  SORT_HEALTHY_SCORE,
  SORT_DIET
} from './actions';


const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipeDetail: []
};

export default function rootReducer(state = initialState, action) {

  switch (action.type) {

    case GET_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
        allRecipes: [...state.recipes, ...action.payload]
      };

    case CLEAR:
      return {
        ...state,
        recipes: [],
        recipeDetail: [],
        allRecipes: [],
      };

    case GET_DIET:
      return {
        ...state,
        diets: action.payload
      }

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
        allRecipes: [...state.recipes, ...action.payload]
      };

    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload
      };

    case SORT_AZ:
      const sortedRecipesName = action.payload === "upward" ?
        state.recipes.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1
          }
          return 0
        })
        : state.recipes.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1
          }
          return 0
        });

      const otherSortedRecipesName = action.payload === "upward" ?
        state.allRecipes.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1
          }
          return 0
        })
        : state.allRecipes.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1
          }
          return 0
        });

      return {
        ...state,
        recipes: sortedRecipesName.length === otherSortedRecipesName.length ? otherSortedRecipesName : sortedRecipesName
      };

    case SORT_SCORE:
      const sortedRecipesScore = action.payload === "falling" ?
        state.recipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return -1
          }
          if (a.spoonacularScore < b.spoonacularScore) {
            return 1
          }
          return 0
        })
        : state.recipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return 1
          }
          if (a.spoonacularScore < b.spoonacularScore) {
            return -1
          }
          return 0
        });

      const otherSortedRecipesScore = action.payload === "falling" ?
        state.allRecipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return -1
          }
          if (a.spoonacularScore < b.spoonacularScore) {
            return 1
          }
          return 0
        })
        : state.allRecipes.sort(function (a, b) {
          if (a.spoonacularScore > b.spoonacularScore) {
            return 1
          }
          if (a.spoonacularScore < b.spoonacularScore) {
            return -1
          }
          return 0
        });

      return {
        ...state,
        recipes: sortedRecipesScore.length === otherSortedRecipesScore.length ? otherSortedRecipesScore : sortedRecipesScore
      };

    case SORT_HEALTHY_SCORE:
      const sortedRecipesHealthyScore = action.payload === "falling" ?
        state.recipes.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return -1
          }
          if (a.healthScore < b.healthScore) {
            return 1
          }
          return 0
        })
        : state.recipes.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return 1
          }
          if (a.healthScore < b.healthScore) {
            return -1
          }
          return 0
        });

      const otherSortedRecipesHealthyScore = action.payload === "falling" ?
        state.allRecipes.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return -1
          }
          if (a.healthScore < b.healthScore) {
            return 1
          }
          return 0
        })
        : state.allRecipes.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return 1
          }
          if (a.healthScore < b.healthScore) {
            return -1
          }
          return 0
        });

      return {
        ...state,
        recipes: sortedRecipesHealthyScore.length === otherSortedRecipesHealthyScore.length ? otherSortedRecipesHealthyScore : sortedRecipesHealthyScore
      };

    case SORT_DIET:

      const sortedDiets = action.payload === "sort by DIET" ? state.recipes :
        state.recipes.filter(recipe => {
          const str = recipe.diets.split(', ')
          if (str.includes(action.payload)) {
            return recipe;                                                                 // eslint-disable-next-line
          } return
        });

      return {
        ...state,
        recipes: sortedDiets
      }

    default:
      return { ...state }
  }
};
