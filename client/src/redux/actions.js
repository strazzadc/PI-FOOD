import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const CLEAR = 'CLEAR';
export const GET_DIET = 'GET_DIET';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const SORT_AZ = 'SORT_AZ';
export const SORT_SCORE = 'SORT_SCORE';
export const SORT_HEALTHY_SCORE = 'SORT_HEALTHY_SCORE';
export const SORT_DIET = 'SORT_DIET';


export function getRecipes() {

    return function (dispatch) {
        return fetch(`http://localhost:3001/recipes`)
            .then(res => res.json())
            .then(recipes => { dispatch({ type: GET_RECIPES, payload: recipes }) })
            .catch(error => console.log(error));
    };
};

export function clear() {
    return {
        type: CLEAR
    };
};

export function getDiets() {
    return fetch(`http://localhost:3001/types`)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error));
};

export function getProductDetail(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/recipes/${id}`)
            .then(res => res.json())
            .then(recipe => { dispatch({ type: GET_PRODUCT_DETAIL, payload: recipe }) })
            .catch(error => console.log(error));
    }
};

export function createRecipe(payload) {
    return async function () {
        try {
            return await axios.post('http://localhost:3001/recipes', payload);
        } catch (error) {
            console.log(error);
        };
    };
};

export function searchRecipe(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/recipes/?name=${name}`)
            .then(res => dispatch({ type: SEARCH_RECIPE, payload: res.data }))
            .catch(error => {
                if (error.response.status === 404) return alert(error.response.data.msg)
                alert(error.message)
            })
    };
};

export function sortAZ(payload) {
    try {
        return {
            type: SORT_AZ,
            payload: payload
        }
    } catch (error) {
        console.log(error);
    };
};

export function sortScore(payload) {
    try {
        return {
            type: SORT_SCORE,
            payload: payload
        }
    } catch (error) {
        console.log(error);
    };
};

export function sortHealthyScore(payload) {
    try {
        return {
            type: SORT_HEALTHY_SCORE,
            payload: payload
        }
    } catch (error) {
        console.log(error);
    };
};


export function sortDiet(payload) {
    try {
        return {
            type: SORT_DIET,
            payload: payload
        }
    } catch (error) {
        console.log(error);
    };
};

