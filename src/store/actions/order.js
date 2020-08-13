import * as Actions from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type:Actions.ORDER_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type:Actions.ORDER_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:Actions.ORDER_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => {
    console.log(orderData);
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then(response=> {
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data,orderData));
            dispatch(resetIngredients());
        })
        .catch(err=>{
            dispatch(purchaseBurgerFail(err));
            dispatch(resetIngredients());
        });
    }
}

export const resetIngredients = () => {
    return {
        type:Actions.RESET_INGREDIENTS
    }
}

export const purchaseInit = () => {
    return {
        type:Actions.ORDER_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type:Actions.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type:Actions.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrderStart = () => {
    return {
        type:Actions.FETCH_ORDERS_START
    }
}

export const fetchOrders  = (token,userId) => {
    console.log(userId);
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParam = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParam)
            .then(res=>{
                console.log(res.data);
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                dispatch(fetchOrderSuccess(fetchOrders))
            })
            .catch(err=>{
                dispatch(fetchOrderFail(err));
            })
    }
}