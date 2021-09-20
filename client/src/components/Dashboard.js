import React from 'react'
import "../style/style.css"
// Importing Redux Requirement
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { logout } from '../actions/auth'
import StudentDashboard from './StudentDashboard'
import FacultyDashboard from './FacultyDashboard'

// const Navbar= (props,{logout})=>{
//     return(
//         <div className="navbar">
//             <div>
//                 {props.name}
//             </div>
//             <div>
//             <button className="bt" onClick={()=>logout()}>Logout</button>
//             </div>
//         </div>
//     )
// }


const Dashboard = ({user,isAuthenticated,logout}) => {
    
    if(!isAuthenticated){
       return (<Redirect to='/login' />)
    }
    console.log(user)
    if(user.designation == "Student"){
        return (
            <div>
                <div className="navbar">
                <div className="nav-text">
                    Student Dashboard -{user.name}
                </div>
                <div>
                    <button className="bt nav-bt" onClick={()=>logout()}>
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
                </div>
                <StudentDashboard />
                
            </div>
        )
    }
    if(user.designation == "Faculty"){
        return (
            <div>
                <div className="navbar">
                <div className="nav-text">
                    Faculty Dashboard -{user.name}
                </div>
                <div>
                    <button className="bt nav-bt" onClick={()=>logout()}>
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
                </div>
                <FacultyDashboard />
                
            </div>
        )
    }
    return (
        <div>
            DashBoard-
            <button className="bt" onClick={()=>logout()}>Logout</button>
        </div>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    logout:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    user:state.auth.user,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout})(Dashboard)
