import axios from 'axios'
import {
    GET_CLASS,
    CREATE_CLASS,
    FACULTY_CLASS_FAIL,
    UPDATE_STD,
    GET_CLASS_DETAIL
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

// Get one Specific Class Detail
export const getClassDetail = (class_id)=>
async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/faculty_class/${class_id}`)
        dispatch({
            type: GET_CLASS_DETAIL,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: FACULTY_CLASS_FAIL,
            payload: err.response
        })
    }
}

// Create a New Class
export const createClass = ({class_name,class_abv,year},students=null)=>
async dispatch =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({class_name,class_abv,year,students})
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

// Updating state with selected students
export const updateStudents = ({students})=>
async dispatch =>{
    try {
        dispatch({
            type:UPDATE_STD,
            payload:students
        })
        
    } catch (err) {
        dispatch({
            type: FACULTY_CLASS_FAIL,
            payload: err.response
        })
    }
}

