import React, {useEffect} from 'react'
import Navbar from './Navbar'
import {Redirect} from 'react-router-dom'

import ClassDetailContainer from './ClassDetailContainer'

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
              <div className='mb-2'>
                  <Navbar />
                  <p>Classes Detail</p>
                  <div className="d-flex justify-content-center cl-detail-container">
                    <div style={{flex:"1"}} className="d-flex border width-100">
                          <div  className="d-flex  flex-column width-100" >
                          <div className='diff-tabs d-flex ' >Problems</div>
                          {faculty_class.problems.map(((problem,index)=>{
                              return(
                                  <div key={index} className="ml-1 mt-1" >
                                      <div className="d-flex flex-column">
                                      <div>{problem.problem_title}</div>
                                      <div>{problem.problem_statement}</div>
                                      </div>
                                      <hr style={{width:"80%"}} />
                                  </div>
                              )
                          }))}
                          </div>
                    </div>
                    <div style={{flex:"3"}} className="d-flex border flex-column width-100">
                            <div className="d-flex flex-column width-100">
                            <div className='diff-tabs d-flex '>Problem Description</div>
                            <ClassDetailContainer class_id={match.params.id} />
                            </div>
                    </div>
                      
                  </div>
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