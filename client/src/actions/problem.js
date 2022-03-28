import axios from "axios";
import {
    GET_PROBLEMS,
    POST_PROBLEM,
    ADD_TESTCASE,
    PROBLEM_ERROR,
    UPDATE_PROB
} from '../actions/types'

// Get All Problems

export const getProblems = ()=>
async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/api/problem')
        dispatch({
            type:GET_PROBLEMS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: PROBLEM_ERROR,
            payload:{err}
        })
    }
}

// Add a Problem
export const addProblem = (formData,class_id)=>
async dispatch =>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        formData.facultyClass_id = class_id
        const body = JSON.stringify(formData)
        const res = await axios.post('http://localhost:5000/api/problem',body,config)
        dispatch({
            type: POST_PROBLEM,
            payload : res.data.problem
        })
        dispatch({
            type:UPDATE_PROB,
            payload: res.data.fac_class
        })
        return res.data._id

    } catch (err) {
        dispatch({
            type: PROBLEM_ERROR,
            payload:{err}
        })
    }
}

// Add a Testcase
export const addTestcase = ({input,output,problem_id})=>
async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':"application/x-www-form-urlencoded;charset=utf-8"
            }
        }
        const new_output= output.replace(/^\s+|\s+$/g, '')
        const body = new URLSearchParams();
        body.append('problem_id',problem_id);
        body.append('input',input);
        body.append('output',new_output);
        
        const res = await axios.put('http://localhost:5000/api/problem',body,config)
        dispatch({
            type:ADD_TESTCASE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROBLEM_ERROR,
            payload:{err}
        })
    }
}