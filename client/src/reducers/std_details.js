import {
    STD_DETAILS_SUCCESS,
    STD_DETAILS_FAIL
} from '../actions/types'

const initialState = {
    year:null,
    division:null,
    batch:null,
    subject:[],
    error:null
}

const std_details = (state= initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case STD_DETAILS_SUCCESS:
            return{
                ...state,
                year:payload.year,
                division:payload.division,
                batch:payload.batch
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