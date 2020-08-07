import * as Actions from './actions';

const initState = {
    ingredients:null,
    price:0
}

export default function(state=initState,action) {
    
    switch (action.type) {
        case Actions.ADD_INGREDIENT:
            return state;
            
        case Actions.REMOVE_INGREDIENT:
            return state;

        default:
            return state;
    }
}