import {
    STD_DETAILS_SUCCESS,
    STD_DETAILS_FAIL,
    STD_BY_YEAR
} from '../actions/types'

const initialState = {
    name:null,
    year:null,
    division:null,
    batch:null,
    subject:[],
    students:[],
    error:null
}

const std_details = (state= initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case STD_DETAILS_SUCCESS:
            return{
                ...state,
                name: payload.name,
                year:payload.year,
                division:payload.division,
                batch:payload.batch
            }
        case STD_BY_YEAR:{
            return{
                ...state,
                students:payload
            }
        }
        case STD_DETAILS_FAIL:
            return{
                ...state,
                error:payload
            }
        default:
            return state
    }
}

export default std_details