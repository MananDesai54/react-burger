import * as Actions from '../actions/actionTypes';

const initState = {
    ingredients:null,
    price:4,
    error:false
}

const INGREDIENT_PRICE = {
    salad:0.4,
    cheese:0.4,
    meat:1.3,
    bacon:0.5,
    loading:false
}

export default function(state=initState,action) {
    switch (action.type) {
        case Actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                price:state.price + INGREDIENT_PRICE[action.ingredientName]
            }
            
        case Actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                price:state.price + INGREDIENT_PRICE[action.ingredientName]
            }

        case Actions.SET_INGREDIENT:
            return {
                ...state,
                ingredients:action.ingredients,
                error:false,
                price:4
            }

        case Actions.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        
        case Actions.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients:null,
                price:4
            }

        default:
            return state;
    }
}