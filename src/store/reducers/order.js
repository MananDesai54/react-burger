import * as Actions from '../actions/actionTypes';

const initState = {
    orders:[],
    loading:false,
    purchased:false
}

export default function (state=initState,action) {
    switch (action.type) {

        case Actions.ORDER_INIT:
            return {
                ...state,
                purchased:false
            }

        case Actions.ORDER_BURGER_START:
        case Actions.FETCH_ORDERS_START:
            return {
                ...state,
                loading:true
            }

        case Actions.ORDER_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId.name
            }
            return {
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            }

        case Actions.ORDER_BURGER_FAIL:
        case Actions.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading:false
            }

        case Actions.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading:false
            }
    
        default:
            return state
    }
}