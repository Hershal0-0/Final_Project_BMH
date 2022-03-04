import axios from 'axios'
import {
    STD_DETAILS_SUCCESS,
    STD_BY_YEAR,
    STD_DETAILS_FAIL
} from './types'

// Create a Student Detail
export const createDetail = ({year,division,batch}) =>
    async dispatch =>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({year,division,batch})
    try {
        const res = await axios.post('http://localhost:5000/api/student_detail/',body,config)
        dispatch({
            type: STD_DETAILS_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response
        dispatch({
            type:STD_DETAILS_FAIL,
            payload:errors
        })
    }
    }

// Get student details for a specific year
export const getDetailByYear = (year)=>
async dispatch =>{
    try {
        const res = await axios.get(`http://localhost:5000/api/student_detail/${year}`)  
        dispatch({
            type:STD_BY_YEAR,
            payload: res.data
        })
    } catch (err) {    
        dispatch({
            type:STD_DETAILS_FAIL,
            payload: err.response
        })
    }
}
    
