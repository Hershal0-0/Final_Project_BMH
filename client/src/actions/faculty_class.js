import axios from 'axios'
import {
    GET_CLASS,
    CREATE_CLASS,
    FACULTY_CLASS_FAIL
} from './types'

// Get all classes from a specific faculty
export const getClass = ()=>
async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/api/faculty_class/')
        dispatch({
            type: GET_CLASS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: FACULTY_CLASS_FAIL,
            payload: err.response
        })
    }
}

// Create a New Class
export const createClass = ({class_name,class_abv,year})=>
async dispatch =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({class_name,class_abv,year})
    try {
        const res = await axios.post('http://localhost:5000/api/faculty_class/',body,config)
        dispatch({
            type: CREATE_CLASS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: FACULTY_CLASS_FAIL,
            payload: err.response
        })
    }
}