import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'

// importing Redux Requirement
import {connect} from 'react-redux'
import {postSolution} from '../actions/solution'
import {getProblems} from '../actions/problem'
import Problem from './Problem'

const StudentDashboard = ({
    getProblems,
    problems
}) => {
    
    useEffect(()=>{
        getProblems()
    },[])
    return (
        <div style={{width:"100%"}}>
            <div style={{margin:"1rem 0 1rem 0"}}>
                <h3>Problems</h3>
            </div>
            
            <div className="d-flex prob-container">
            <div style={{width:"70%"}} >
                {problems.map((problem,index)=>{
                    return(                        
                        <Problem key={index} problem={problem} />
                    )
                })}
            </div>            
            </div>
            
        </div>
    )
}

StudentDashboard.propTypes = {
    getProblems: PropTypes.func.isRequired,    
    problems: PropTypes.array.isRequired,
}

const mapStateToProps= state=>({
    problems:state.problem.problems
})

export default connect(mapStateToProps,{getProblems})(StudentDashboard)
