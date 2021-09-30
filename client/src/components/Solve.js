import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// Importing Redux Requirements
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import {postSolution} from '../actions/solution'

const Solve = ({
    isAuthenticated,
    user,
    problems,
    match,
    postSolution
    }) => {
    
    const [problem,setProblem]= useState(null)
    const [code,setCode] = useState(`function add(a, b) {
        return a + b;
      }
      `)
    const [language,setLanguage] = useState("Python")
    useEffect(()=>{
       const temp = problems.filter(problem => (problem._id== match.params.id)) 
       setProblem(temp[0])
    },[])

    const handleSubmit = () =>{
        const formData={
            problem_id:match.params.id,
            language:language,
            code:code
        }
        console.log(formData)
        postSolution(formData)
    }

    if(!isAuthenticated){
        return (<Redirect to="/login" />)
    }
    else if(user.designation!=="Student"){
        return ( <Redirect to="/dashboard" /> )
    }
    if(problem !== null){
        return (
            <div>
                <Navbar/>
                <div className="solve-container d-flex">
                    <div className="solve-prob">
                        <p className="prob-title">
                            {problem.problem_title}
                        </p>
                        <hr style={{width:"90%"}} /> <br />
                        <div className="prob-statement">
                            {problem.problem_statement}
                            
                        </div>
                        <p style={{fontSize:"1rem"}}>
                            By: {problem.faculty_name}
                        </p>

                    </div>
                    <div className="code-editor">                    
                        <select
                        defaultValue="Python"
                        onChange={e => setLanguage(e.target.value)}
                        name="language" 
                        style={{margin:"1rem 0 1rem 0"}} >
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                        </select>
                        <Editor
                        className="c-editor"            
                        value={code}
                        onValueChange={code => setCode( code )}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        }}
                        />
                        <button onClick={()=> handleSubmit()}>Submit Code</button>
                    

                    </div>
                </div>
            </div>
        )
    }
    

    return(
        <div>
            <Navbar />
        </div>
    )
}

Solve.propTypes = {
    isAuthenticated : PropTypes.bool,
    user: PropTypes.object,
    problems: PropTypes.array.isRequired,
    postSolution: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    problems:state.problem.problems
})

export default connect(mapStateToProps,{postSolution})(Solve)
