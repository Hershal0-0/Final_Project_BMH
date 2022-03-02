import React from 'react'
// Importing Redux Requirements
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { Link } from 'react-router-dom'

const Navbar = ({auth,logout}) => {
    if(auth.user !== null){
        if(auth.user.designation === "Student"){
            return (
                <div>
                    <div className="navbar">
                    <Link to='/dashboard' className="nav-text">
                        Student Dashboard -{auth.user.name}
                    </Link>
                    <div className='d-flex'>
                        <Link to='/student_detail' className='profile-link'>
                        <i className="far fa-2x fa-id-card"></i>
                        <>My Profile</>
                        </Link>
                        <button className="bt nav-bt" onClick={()=>logout()}>
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                    </div>                                        
                </div>
            )
        }
        if(auth.user.designation === "Faculty"){
            return (
                <div>
                    <div className="navbar">
                    <Link to='/dashboard' className="nav-text">
                        Faculty Dashboard -{auth.user.name}
                    </Link>

                    <div className='d-flex'>
                        <Link to='/classes' className='profile-link'>
                        <i className="fas fa-2x fa-chalkboard-teacher"></i>
                        <>My Classes</>
                        </Link>
                        <button className="bt nav-bt" onClick={()=>logout()}>
                            <i  className="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                
                    
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            
        </div>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
