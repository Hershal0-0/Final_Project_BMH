import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:null,
    user:null
}

const auth = (state=initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true
                
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
           localStorage.removeItem('token')
           return{
               ...state,
               token:null,
               isAuthenticated:false,
               loading:false               
           }
        case USER_LOADED:        
           return {
               ...state,
               isAuthenticated:true,
               loading:false,
               user: payload,
               loading:false
           }

        default:
            return state 
            
    }
}

export default auth