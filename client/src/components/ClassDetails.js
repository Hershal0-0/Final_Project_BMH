import React, {useEffect} from 'react'
import Navbar from './Navbar'
import {Redirect} from 'react-router-dom'

// importing reddux requirements
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadUser } from '../actions/auth'
import {getClassDetail} from '../actions/faculty_class'

const ClassDetails = ({
    match,
    auth,
    isAuthenticated,
    loadUser,
    faculty_class,
    getClassDetail
}) => {

    useEffect(()=>{
        loadUser()
        console.log(match.params.id)
        getClassDetail(match.params.id)
    },[])

    if(auth.user !== null){
        
        if(!isAuthenticated){
          return (<Redirect to='/login'/> )
        }
        if(auth.user.designation=="Faculty"){
        
          return (
              <div>
                  <Navbar />
                    <p>Classes Detail</p>
              </div>
          )
        }else{
            return (<Redirect to='/dashboard'/>)
          }
    }
    else{
        return(
            <></>
        )
    }
}

ClassDetails.propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired,
    getClassDetail: PropTypes.func.isRequired,
    faculty_class: PropTypes.object.isRequired

}

const mapStateToProps = (state)=>({
    auth:state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    faculty_class: state.faculty_class
})

export default connect(mapStateToProps,{loadUser,getClassDetail})(ClassDetails)