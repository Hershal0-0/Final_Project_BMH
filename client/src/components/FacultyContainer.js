import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// Importing Redux Requirements
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProblems, addProblem, addTestcase } from '../actions/problem'

const FacultyContainer = ({
    getProblems,
    addProblem,
    addTestcase,
    newProbId,
    content}) => {

    const [input,setInput]=useState(`function add(a, b) {
        return a + b;
      }
      `)
    const [output,setOutput]=useState(`function add(a, b) {
        return a + b;
      }
      `)
    const [formData, setFormData] =useState({
        problem_title:"",
        problem_statement:""        
    })

    const {problem_title,problem_statement}=formData

    useEffect(()=>{
        if(newProbId!==null){
            console.log(newProbId)
            addTestcase({
                input,
                output,
                problem_id:newProbId
            })
        }
    },[newProbId])

    const onChange = (e)=> setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        const id =addProblem(formData)    
    }

    if(content==="my-prob"){
        return(
            <div>
                My Problems
            </div>
        )
    }
    if(content==="all-prob"){
        return(
            <div>
                All Problems
            </div>
        )
    }
    if(content==="add-prob"){
        return(
            <div>
                <form onSubmit = { (e)=> handleSubmit(e)} >
                    <h3>Problem Description</h3>
                    <hr style={{width:"90%"}} /> <br />
                    <div style={{width:"100%"}} className="d-flex form-group">
                        <label style={{width:"40%"}} htmlFor="problem_title">Problem Title</label>
                        <input
                        value={problem_title}
                        onChange = {e => onChange(e)} 
                        style={{width:"60%"}} 
                        type="text" 
                        name="problem_title" 
                        required />
                    </div>
                    <br />
                    <div style={{width:"100%"}} className="d-flex form-group">
                        <label style={{width:"40%"}} htmlFor="problem_statement">Problem Statement</label>
                        <textarea 
                        value = {problem_statement}
                        onChange = {e => onChange(e)}
                        name="problem_statement"
                        required 
                        cols="50" rows="10"></textarea>
                    </div>
                    <br />
                    <h3>Problem TestCase</h3>
                    <hr style={{width:"90%"}} /> <br />
                    <div className="d-flex justify-content-between testcase-container">
                        <div className="test-input">
                            INput
                            <Editor
                            className="c-editor"            
                            value={input}
                            onValueChange={code => setInput( code )}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                            }}
                            />
                        </div>
                        <div className="test-output">
                            OUTput
                            <Editor
                            className="c-editor"            
                            value={output}
                            onValueChange={code => setOutput( code )}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                            }}
                            />
                        </div>
                    </div>
                    <input style={{marginBottom:"2rem"}}  type="submit" value="Add a Problem" />
                </form>
            </div>
        )
    }
}

FacultyContainer.propTypes = {
    problems: PropTypes.array,
    getProblems:PropTypes.func.isRequired,
    addProblem: PropTypes.func.isRequired,
    addTestcase: PropTypes.func.isRequired,
    newProbId: PropTypes.object
}

const mapStateToProps= (state) =>({
    problems:state.problem.problems,
    newProbId: state.problem.newProbId
})

export default connect(mapStateToProps,{getProblems, addProblem, addTestcase})(FacultyContainer)
