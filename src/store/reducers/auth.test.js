import reducer from './auth';
import * as Actions from '../actions/actionTypes';

describe('Auth Reducer',() => {
    it('It should return initState',()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false
        })
    })

    it('It should store token on login',()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false
        },{
            type:Actions.AUTH_SUCCESS,
            token:'Hello',
            userId:'Hello'
        })).toEqual({
            token:'Hello',
            userId:'Hello',
            error:null,
            loading:false
        })
    })
})