import React,{ useState,useEffect } from 'react'


// importing redux requirements
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createClass,getClass} from '../actions/faculty_class'
import {getDetailByYear} from '../actions/std_details'
import { Redirect,useHistory } from 'react-router-dom'


const ClassesContainer = ({
    createClass,
    getClass,
    getDetailByYear,
    faculty_class,
    students,
    content
}) => {

    useEffect(()=>{
        getClass()
    },[])

    const [stdSelected,setStdSelected] = useState([])
    let std_arr = []
    const handleCallback = (data)=>{
        // console.log(data)
        if(std_arr.includes(data)){
            let new_arr = std_arr.filter((std)=> std!==data)
            std_arr = new_arr
            console.log(std_arr)    
            return
        }
        else{
            std_arr.push(data)
            console.log(std_arr)
        }
    }
    

    const StdListItem = ({student,sendData})=>{
        const [selected,setSelected] = useState(false)
        const selectStudent = (std_id)=>{
            
            setSelected(!selected)
             
            sendData(std_id)
                    
            // console.log(std_id)
        }
        
        return(
            <div style={{width:"100%"}}  onClick = {()=> selectStudent(student.student_id)}>
                    <div className="d-flex justify-content-between">
                      <div style={{paddingLeft:"0.5rem"}}>
                        <a style={{fontSize: "1.2rem"}}>{student.name}</a><br />
                        <a>{student.rollno}</a><br />
                        <a>Batch: {student.batch}</a>
                      </div>
                      <div style={{width:"15%",paddingTop:"20px"}}>
                      {selected==true ? <i className="fas fa-check-square"></i> : <></> }
                      
                      </div>
                    </div>
                      <hr style={{width:"90%"}} />
                </div>
        )
    }

    const [formData,setFormData]=useState({
        class_name:"",
        class_abv:"",
        year:"FE"
    })

    const {class_name,class_abv,year} = formData

    useEffect(()=>{
        getDetailByYear(formData.year)
    },[year])

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // setStdSelected(std_arr)
        createClass(formData,std_arr)
        setFormData({
            class_name:"",
            class_abv:"",
            year:"FE" 
        })
        alert("New Class Created Successfully")
    }


  const ClassRedirect = ({subject})=>{

    const history = useHistory()
    
      return(
        <div onClick={()=> history.push(`/classes/${subject._id}`)}>      
        <div style={{paddingLeft:"0.5rem"}}>
          <a style={{fontSize: "2rem"}}>{subject.class_abv}</a><br />
          <a>{subject.class_name}</a><br />
          <a>Year: {subject.year}</a>
        </div>
        <hr style={{width:"90%"}} />
        </div>   
      )
  }  
  if(content == 'my-classes')
  return(
      <div>
          {faculty_class.classes.map((subject,index)=>{
              return(<ClassRedirect  key={index} subject={subject} />)
          })}
      </div>
  )
  if(content == 'add-class')
  return(
      <div>
          <form onSubmit={ (e) => handleSubmit(e)}>
          <h3>NEW Description</h3>
          <hr style={{width:"90%"}} /> <br />
          <div style={{width:"100%"}} className="d-flex form-group">
                <label style={{width:"40%"}} htmlFor="class_name">Class Name</label>
                <input
                value={class_name}
                onChange = {e => onChange(e)} 
                style={{width:"60%"}} 
                type="text" 
                name="class_name" 
                required />
            </div> <br />
            <div style={{width:"100%"}} className="d-flex form-group">
                <label style={{width:"40%"}} htmlFor="class_abv">Class Abv</label>
                <input
                value={class_abv}
                onChange = {e => onChange(e)} 
                style={{width:"60%"}} 
                type="text" 
                name="class_abv" 
                required />
            </div><br />
            <div style={{width:"100%"}} className="d-flex form-group">
                <label style={{width:"40%"}} htmlFor="year">Year</label>
                <select
                    value={year}
                    onChange= {e => onChange(e)}
                    name="year"
                >
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                </select>
            </div><br />
            {students.map((student,index)=>{
                return(
                    <StdListItem key={index} student={student} sendData = {handleCallback} />
                    
                )
            })}
            <input style={{marginBottom:"2rem",marginTop:"1rem"}}  type="submit" value="Create a New Class" />
          </form>
      </div>
  )
}

ClassesContainer.propTypes = {
    createClass: PropTypes.func.isRequired,
    getClass: PropTypes.func.isRequired,
    getDetailByYear: PropTypes.func.isRequired,
    faculty_class: PropTypes.object,
    students: PropTypes.array
}

const mapStateToProps = (state)=>({
    faculty_class : state.faculty_class,
    students:state.std_details.students,
    
})

export default connect(mapStateToProps,{createClass,getClass,getDetailByYear})(ClassesContainer)