import * as Actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:Actions.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type:Actions.AUTH_SUCCESS,
        token:authData.idToken,
        userId:authData.localId
    }
}

export const authFail = (error) => {
    return {
        type:Actions.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    localStorage.removeItem('userId');
    return {
        type:Actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (time) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },time*1000);
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout())
        } else {
            const expire = new Date(localStorage.getItem('expire'));
            if(expire < new Date()) {
                dispatch(logout());
            }
            dispatch(authSuccess({idToken:token,localId:localStorage.getItem('userId')}));
            // console.log(+expire.getTime() - +new Date().getTime())
            dispatch(checkAuthTimeout((expire.getTime() - new Date().getTime())/1000));
        }
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken:true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCs7hE0mCjLNixpU3jXDyE3Hjk95q6JPjM';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCs7hE0mCjLNixpU3jXDyE3Hjk95q6JPjM';
        };

        axios.post(url,authData)
            .then(response => {

                const expiration = new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expire',expiration);
                localStorage.setItem('userId',response.data.localId);

                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}