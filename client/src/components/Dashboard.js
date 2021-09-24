import React, { useEffect } from 'react'

// Importing Redux Requirement
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { loadUser, logout } from '../actions/auth'
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


const Dashboard = ({
    auth,
    isAuthenticated,
    logout,loadUser}) => {
    // useEffect(()=>{
    //     loadUser()
    // },[])
    if(!isAuthenticated){
       return (<Redirect to='/login' />)
    }
    if(auth.user !== null){
        if(auth.user.designation === "Student"){
            return (
                <div>
                    <div className="navbar">
                    <div className="nav-text">
                        Student Dashboard -{auth.user.name}
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
        if(auth.user.designation === "Faculty"){
            return (
                <div>
                    <div className="navbar">
                    <div className="nav-text">
                        Faculty Dashboard -{auth.user.name}
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
    
    }
        return (
        <div>
            {/* DashBoard-
            <button className="bt" onClick={()=>logout()}>Logout</button> */}
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    logout:PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout,loadUser})(Dashboard)
