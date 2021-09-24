import axios from "axios";
import {
    GET_PROBLEMS,
    POST_PROBLEM,
    ADD_TESTCASE,
    PROBLEM_ERROR
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
export const addProblem = ({problem_statement})=>
async dispatch =>{
    try {
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
            }
        }
        const body = JSON.stringify({problem_statement})
        const res = await axios.post('http://localhost:5000/api/problem',body,config)
        dispatch({
            type: POST_PROBLEM,
            payload : res.data
        })

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
        const body = JSON.stringify({input,output,problem_id})
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