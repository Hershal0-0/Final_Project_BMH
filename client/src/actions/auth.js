import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types'

// Load User
export const loadUser = ()=>
async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response
        dispatch({
            type: AUTH_ERROR,
            payload:errors
        })
    }
}

// Register a User
export const registerUser = ({name,rollno,email,password})=>
async dispatch =>{
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({name,rollno,email,password})
    try {
        const res = await axios.post('/users',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response
        dispatch({
            type:REGISTER_FAIL,
            payload:errors
        })
    }
}

// Login User
export const login = ({email,password})=>
async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})
    try {
        const res = await axios.post('/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response
        dispatch({
            type:LOGIN_FAIL,
            payload:errors
        })
    }
}

// Logout User
export const logout = ()=>
dispatch =>{
    dispatch({
        type:LOGOUT
    })
}