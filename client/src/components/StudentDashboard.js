import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'

// importing Redux Requirement
import {connect} from 'react-redux'
import {postSolution} from '../actions/solution'
import {getClassOfStudent,getClassProblem} from '../actions/std_details'
import {getProblems} from '../actions/problem'
import Problem from './Problem'

const StudentDashboard = ({
    getProblems,
    getClassOfStudent,
    getClassProblem,
    std_classes,
    class_problems,
    problems
}) => {
    
    useEffect(()=>{
        getProblems()
        getClassOfStudent()
    },[])

    const handleClick = (facultyClass_id)=>{
        // alert(facultyClass_id)
        getClassProblem(facultyClass_id)
    }

    return (
        <div style={{width:"100%"}}>
            <div style={{margin:"1rem 0 1rem 0"}}>
                <h3>My Classes</h3>
            </div>

            <div className="d-flex std-dashboard width-90">
                <div className="d-flex border width-100">
                    <div style={{flex:"1"}} className="d-flex border flex-column">
                        <div className="diff-tabs">
                            My Classes
                        </div>
                        {std_classes.map((std_class,index)=>{
                            return(
                            <div key={index} onClick={()=> handleClick(std_class.facultyClass_id) } className="ml-1 mt-1" >
                                <div className="d-flex flex-column">
                                <div>{std_class.subject_abv}</div>
                                <div>{std_class.subject_name}</div>
                                <div>{std_class.faculty_name}</div>
                                </div>
                            <hr style={{width:"80%"}} />
                            </div>)
                        })}
                    </div>
                    <div style={{flex:"3"}} className="d-flex border flex-column">
                        <div className="diff-tabs">
                            Problems
                        </div>
                        {class_problems.map((problem,index)=>{
                            return(
                                <Problem key={index} problem={problem} />
                            )
                        })}
                    </div>
                </div>
            </div>
            
            {/* <div className="d-flex prob-container">
            <div style={{width:"70%"}} >
                {problems.map((problem,index)=>{
                    return(                        
                        <Problem key={index} problem={problem} />
                    )
                })}
            </div>            
            </div> */}
            
        </div>
    )
}

StudentDashboard.propTypes = {
    getProblems: PropTypes.func.isRequired,    
    getClassOfStudent: PropTypes.func.isRequired,
    getClassProblem: PropTypes.func.isRequired,
    problems: PropTypes.array.isRequired,
}

const mapStateToProps= state=>({
    problems:state.problem.problems,
    std_classes: state.std_details.std_classes,
    class_problems : state.std_details.class_problems
})

export default connect(mapStateToProps,{getProblems,getClassOfStudent,getClassProblem})(StudentDashboard)
