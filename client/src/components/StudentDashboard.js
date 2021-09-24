import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// importing Redux Requirement
import {connect} from 'react-redux'
import {postSolution} from '../actions/solution'
import {getProblems} from '../actions/problem'

const StudentDashboard = ({
    getProblems,
    postSolution,
    problems
}) => {
    const [code,setCode] = useState(`function add(a, b) {
        return a + b;
      }
      `)
    useEffect(()=>{
        getProblems()
    },[])
    return (
        <div style={{width:"100%"}}>
            <div style={{margin:"1rem 0 1rem 0"}}>
                <h3>Problems</h3>
            </div>
            
            <div className="d-flex prob-container">
            <div style={{flex:"11"}}>
                {problems.map((problem,index)=>{
                    return(
                        <div className="problem" key={index}>
                            <h5>{problem.problem_title}</h5>
                            <p>Teacher:{problem.faculty_name}</p>
                        </div>
                    )
                })}
            </div>
            <div className="code-editor">
            <Editor
            
            value={code}
            onValueChange={code => setCode( code )}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            }}
            />
            </div>            
            </div>
            
        </div>
    )
}

StudentDashboard.propTypes = {
    getProblems: PropTypes.func.isRequired,
    postSolution: PropTypes.func.isRequired,
    problems: PropTypes.array.isRequired,
}

const mapStateToProps= state=>({
    problems:state.problem.problems
})

export default connect(mapStateToProps,{getProblems,postSolution})(StudentDashboard)
