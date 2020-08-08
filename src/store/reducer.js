import * as Actions from './actions';

const initState = {
    ingredients:{
        salad:0,
        cheese:0,
        bacon:0,
        meat:0
    },
    price:4
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
        default:
            return state;
    }
}