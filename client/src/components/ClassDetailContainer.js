import React,{useState,useEffect} from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import {Tooltip} from 'react-tippy';

// importing redux requirements
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addProblem,addTestcase} from '../actions/problem'

const ClassDetailContainer = ({
    class_id,
    addProblem,
    addTestcase,
    newProbId
}) => {

  const [input,setInput]=useState('')
  const [output,setOutput]=useState('')
  const [prevTestcase,setPrevTestcase]=useState(["",""])
  const [testcases,setTestcases] = useState([])
  const [formData, setFormData] =useState({
      problem_title:"",
      problem_statement:""        
  })

  const {problem_title,problem_statement}=formData

  useEffect(()=>{
    if(newProbId!==null){
        console.log(newProbId)
        // let new_output = output
        // if(new_output[new_output.length-1]=='\n'){
        //     new_output= new_output.substring(0,new_output.length-1)
        // }
        console.log(testcases)
        console.log(testcases.length)
        if(testcases.length!==0){
            // addTestcase({
            //     input,
            //     output,
            //     problem_id:newProbId
            // })            
            testcases.map( t_case =>{
                addTestcase({
                  input: t_case.input,
                  output: t_case.output,
                  problem_id:newProbId
                })
            })
        }
        setTimeout(()=>{

          setTestcases([])
          setFormData({
            problem_title:"",
            problem_statement:""   
          })
          setPrevTestcase([])
        },2000)
    }
},[newProbId])

  const handleSubmit = (e)=>{
    e.preventDefault()
        
    const id =addProblem(formData,class_id)
    alert("New Problem Added To This Class")    
  }

  const handleTestcase= (e)=>{
    e.preventDefault()
    if(input!=='' && output!==''){
      setTestcases([...testcases,{input,output}])
      setPrevTestcase([input,output])
    }
    setInput('')
    setOutput('')
    // console.log(testcases)
    
  }
  const removeTestcase = (e,cases)=>{
    e.preventDefault()
    // console.log(cases)
    const newCases = testcases.filter((c)=>{
      
      return ((c.input!== cases.input && c.output!==cases.output))
    })
    // console.log(newCases)
    setTestcases([...newCases])
  }

  const onChange = (e)=>setFormData({
    ...formData,
    [e.target.name]:e.target.value
})

  return (
    <div>
      <form onSubmit = { (e)=> handleSubmit(e)} >
          <br />
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
          <div className="d-flex width-100 testcase-header">
            <div></div>
            <div><h3>Problem TestCase</h3></div>
            <div> 
              <Tooltip
                title='Add A TestCase'
                position='top'
              >
              <button onClick={(e)=> handleTestcase(e)} className='bt-no-style'> <i style={{marginLeft:"1rem", fontSize:"1.5rem", color:"skyblue"}} className="fas fa-plus-square"></i></button> 
              </Tooltip>
            </div>
          
          </div>
          <hr style={{width:"90%"}} /> <br />
          <div style={{justifyContent:"flex-start", width:"80%"}}  className="d-flex">
          <div className="testcases">
            {testcases.map((cases,index)=>{
              return(
                <div className='mb-1'  key={index}>
                  <div className="d-flex justify-content-between">
                    <div>Testcase {index+1}</div>
                    <button onClick={(e)=> removeTestcase(e,cases)} className="bt-no-style">
                    <i style={{fontSize:"1.2rem",marginLeft:"20px", color:"rgb(207, 8, 8)"}} className="fas fa-window-close"></i>
                    </button> 
                  </div>
                  <hr style={{width:"100%"}} />
                </div>
              )
            })}
          </div>
          </div>
          <div className="d-flex justify-content-between testcase-container">
              <div className="test-input">
                  INput
                  <Editor
                  className="c-editor"            
                  value={input}
                  placeholder={prevTestcase[0]}
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
                  placeholder={prevTestcase[1]}
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

const mapStateToProps = (state)=>({
  newProbId:state.problem.newProbId
})

export default connect(mapStateToProps,{addProblem,addTestcase})(ClassDetailContainer)