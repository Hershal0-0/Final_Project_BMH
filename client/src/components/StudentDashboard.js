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
        <div>
            Student Dashboard
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
