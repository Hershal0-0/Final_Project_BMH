import {combineReducers} from 'redux'
import auth from './auth'
import problem from './problem'
import solution from './solution'

export default combineReducers({
    auth,
    problem,
    solution
})