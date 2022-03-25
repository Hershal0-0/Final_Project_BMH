import {
    CREATE_CLASS,
    FACULTY_CLASS_FAIL,
    GET_CLASS,
    RESET_STD,
    UPDATE_STD
} from '../actions/types'

const initialState = {
    faculty_id:null,
    faculty_name:null,
    new_classId:null,
    class_name:null,
    class_abv:null,
    selected_std:[],
    year:null,
    classes:[],
    error: null
}

const faculty_class = (state= initialState,action)=>{
    const {type,payload} = action
    switch(type){
        case GET_CLASS:
            return{
                ...state,
                classes:payload
            }
        case CREATE_CLASS:
            return{
                ...state,
                new_classId: payload._id,
                faculty_id:payload.faculty_id,
                faculty_name: payload.faculty_name,
                class_name: payload.class_name,
                class_abv: payload.class_abv,
                year: payload.year,
                selected_std:payload.students
            }

        case UPDATE_STD:
            return{
                ...state,
                selected_std:[payload]
            }

        case FACULTY_CLASS_FAIL:
            return{
                ...state,
                error: payload
            }
        default:
            return state
    }
}

export default faculty_class