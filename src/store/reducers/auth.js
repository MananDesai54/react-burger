import * as Actions from '../actions/actionTypes';

const initState = {
    token:null,
    userId:null,
    error:null,
    loading:false
}

export default function (state=initState,action) {
    switch (action.type) {
        case Actions.AUTH_START:
            return {
                ...state,
                loading:true
            };

        case Actions.AUTH_SUCCESS:
            return {
                ...state,
                token:action.token,
                userId:action.userId,
                error:null,
                loading:false
            }

        case Actions.AUTH_FAIL:
        case Actions.AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                userId:null,
                error:action.error,
                loading:false
            }
    
        default:
            return state;
    }
}