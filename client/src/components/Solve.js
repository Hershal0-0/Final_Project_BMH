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
import {postSolution,getScore} from '../actions/solution'


const Solve = ({
    isAuthenticated,
    user,
    problems,
    solution,
    match,
    postSolution,
    getScore
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

    useEffect(()=>{
        console.log(solution)
    },[solution])

    const handleSubmit = () =>{
        // let new_code = code.toString()
        // if(new_code[new_code.length-1]=='\n'){
        //     new_code = new_code.substring(0,new_code.length-1)
        // }
        const formData={
            problem_id:match.params.id,
            language:language,
            code:code
        }
        // console.log(formData)
        postSolution(formData)
        getScore(formData)
    }

    const RenderSolution = () =>{
        if(solution!=null){
            if(solution.score>0){
                return(
                    <div className="codex-result score-danger">
                    <h1>Score:{solution.score}/{solution.length}</h1>
                    </div>
                )
            }else{
                return(
                    <div className="codex-result score-safe">
                    <h1>Score:{solution.score}/{solution.length}</h1>
                    </div>
                )
            }
        }
        else{
            return null;
        }
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
                
                <RenderSolution />
                
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
    getScore: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    problems:state.problem.problems,
    solution:state.solution.codex_result
})

export default connect(mapStateToProps,{postSolution,getScore})(Solve)
