import {
    POST_SOLUTION, SOLUTION_ERROR
} from '../actions/types'

const initialState = {
    code:null,
    result:null,
    error:null
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