import axios from "axios";
import {
    POST_SOLUTION,
    SOLUTION_ERROR
} from './types'

// Post a Solution
export const postSolution = ({problem_id,language,code})=>
async dispatch =>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
            }
        }
        const body = new URLSearchParams();
        body.append('problem_id',problem_id);
        body.append('language',language);
        body.append('code',code);
        // const body = JSON.stringify(formData)
        const res = await axios.post('http://localhost:5000/api/solution',body,config)
        dispatch({
            type:POST_SOLUTION,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:SOLUTION_ERROR,
            payload:err
        })
    }
}