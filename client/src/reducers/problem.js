import {
    GET_PROBLEMS,
    POST_PROBLEM,
    ADD_TESTCASE,
    PROBLEM_ERROR
} from '../actions/types'

const initialState={
    problems:[],
    problem:null,
    newProbId:null,
    error:null
}

const problem = (state=initialState,action)=>{
    const {type,payload}=action

    switch(type){
        case GET_PROBLEMS:
            return{
                ...state,
                problems:payload
            }
        case POST_PROBLEM:
            return{
                ...state,
                problems:[payload,...state.problems],
                newProbId:payload._id
            }
        case ADD_TESTCASE:
            return{
                ...state,
                newProbId:null,
                problems: state.problems.map(problem=>
                    problem._id===payload.id
                        ?{...problem,testcases:payload.testcases}
                        :problem)
            }
        case PROBLEM_ERROR:
            return{
                ...state,
                newProbId:null,
                error:payload
            }
        default:
            return state
    }
}

export default problem