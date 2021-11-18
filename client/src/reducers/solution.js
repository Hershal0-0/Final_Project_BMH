import {
    GET_SCORE,
    POST_SOLUTION, SOLUTION_ERROR
} from '../actions/types'

const initialState = {
    code:null,
    result:null,
    error:null,
    codex_result:null,
}

const solution = (state=initialState,action)=>{
    const {type,payload}=action

    switch(type){
        case POST_SOLUTION:
            return{
                ...state,
                code: payload.code,
                result: payload.result
            }
        case GET_SCORE:
            return{
                ...state,
                codex_result:payload
            }
        case SOLUTION_ERROR:
            return{
                ...state,
                error:payload
            }
        default:
            return state
    }
}

export default solution