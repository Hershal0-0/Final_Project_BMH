import React from 'react'
// Importing Redux Requirements
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({auth,logout}) => {
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
