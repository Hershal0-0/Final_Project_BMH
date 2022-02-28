import React,{useEffect,useState} from 'react';

// importing redux requirements
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { loadUser } from '../actions/auth';
import Navbar from './Navbar';


const FacultyClass = ({
    auth,
    isAuthenticated,
    loadUser
}) => {

    useEffect(()=>{
        loadUser()
    },[])

    if(auth.user!== null){
        if(!isAuthenticated){
            return (<Redirect to='/login' />)
        }
        if(auth.user.designation === "Faculty"){
            return(
                <>
                <Navbar />
                </>
            )

        }else{
            return(<Redirect to='/dashboard' />)
        }
    }else{
        return (<Navbar />)
    }

  
};

FacultyClass.propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loadUser})(FacultyClass)
