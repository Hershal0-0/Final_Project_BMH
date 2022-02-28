import {combineReducers} from 'redux'
import auth from './auth'
import problem from './problem'
import solution from './solution'
import std_details from './std_details'

export default combineReducers({
    auth,
    problem,
    solution,
    std_details
})