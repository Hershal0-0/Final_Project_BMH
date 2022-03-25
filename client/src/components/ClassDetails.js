import React, {useEffect} from 'react'
import Navbar from './Navbar'
import {Redirect} from 'react-router-dom'

// importing reddux requirements
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadUser } from '../actions/auth'

const ClassDetails = ({
    auth,
    isAuthenticated,
    loadUser
}) => {

    useEffect(()=>{
        loadUser()
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
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loadUser})(ClassDetails)