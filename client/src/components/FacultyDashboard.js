import React, { useEffect, useState } from 'react'
import FacultyContainer from './FacultyContainer'

// Importing Redux Requirements
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProblems} from '../actions/problem'

const FacultyDashboard = ({
    problems,
    getProblems
}) => {
    useEffect(()=>{
        getProblems()
    },[])
    const [content,setContent]=useState("my-prob")
    return (
        <div>
            Faculty Dashboard
            <div style={{marginTop:"2rem"}}  className="d-flex justify-content-center">
                <div className="d-flex faculty-container">
                    <div className="container-tabs d-flex">
                        <div onClick={()=>setContent('my-prob')}  className="tabs">My Problems</div>
                        <div onClick={()=>setContent('all-prob')} className="tabs">All Problems</div>
                        <div onClick={()=>setContent('add-prob')} className="tabs">Add Problem</div>
                    </div>
                    <div className="faculty-container-main">
                        <FacultyContainer content={content} />
                    </div>
                </div>
            </div>            
            
        </div>
    )
}

FacultyDashboard.propTypes = {
    problems: PropTypes.array,
    getProblems: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    problems : state.problem.problems
})

export default connect(mapStateToProps,{getProblems})(FacultyDashboard)
