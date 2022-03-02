import React,{ useState,useEffect } from 'react'


// importing redux requirements
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createClass,getClass} from '../actions/faculty_class'


const ClassesContainer = ({
    createClass,
    getClass,
    faculty_class,
    content
}) => {

    useEffect(()=>{
        getClass()
    },[])

    const [formData,setFormData]=useState({
        class_name:"",
        class_abv:"",
        year:"FE"
    })

    const {class_name,class_abv,year} = formData

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        createClass(formData)
    }

  if(content == 'my-classes')
  return(
      <div>
          {faculty_class.classes.map((subject,index)=>{
              return(
                  <div key={index}>
                      <div style={{paddingLeft:"0.5rem"}}>
                        <a style={{fontSize: "2rem"}}>{subject.class_abv}</a><br />
                        <a>{subject.class_name}</a><br />
                        <a>Year: {subject.year}</a>
                      </div>
                      <hr style={{width:"90%"}} />
                  </div>                    
              )
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
            <input style={{marginBottom:"2rem"}}  type="submit" value="Create a New Class" />
          </form>
      </div>
  )
}

ClassesContainer.propTypes = {
    createClass: PropTypes.func.isRequired,
    getClass: PropTypes.func.isRequired,
    faculty_class: PropTypes.object
}

const mapStateToProps = (state)=>({
    faculty_class : state.faculty_class
})

export default connect(mapStateToProps,{createClass,getClass})(ClassesContainer)