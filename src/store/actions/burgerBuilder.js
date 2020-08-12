import * as Actions from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) =>{
    return {
        type:Actions.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = (name) =>{
    return {
        type:Actions.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredient = ingredients => {
    return {
        type:Actions.SET_INGREDIENT,
        ingredients
    }
}

export const fetchIngredientsFailed = err => {
    return {
        type:Actions.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
             .then(response=>{
                 dispatch(setIngredient(response.data))
             })
             .catch(err=>dispatch(fetchIngredientsFailed(err)));
    }
}