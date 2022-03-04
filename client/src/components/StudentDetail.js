import React,{ useEffect,useState } from 'react';


// importing redux requirement
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import {createDetail} from '../actions/std_details'
import { loadUser, logout } from '../actions/auth';
import Navbar from './Navbar';



const StudentDetail = ({
  auth,
  isAuthenticated,
  logout,loadUser,
  std_details,
  createDetail
}) => {

  useEffect(()=>{
    loadUser()
  },[])



  const [formData,setFormData] = useState({
    year:"",
    division:"",
    batch:""
  })

  const {year,division,batch} = formData

  const onChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(formData);
    createDetail(formData)
    alert("Your Details Have been Successfully Submitted")
    
  }


  // console.log(auth)
  if(auth.user !== null){
    if(!isAuthenticated){
      return (<Redirect to='/login'/> )
    }
    if(auth.user.designation==="Student"){
      return (
        <>
        <Navbar />
        <div className='d-flex det-container'>
          <div className="det-form-container">
            <form onSubmit={ e=> handleSubmit(e) }>
              <div className="input-field">
                <i className="fas fa-user"></i>               
                <input 
                type="text"
                name='name'
                readOnly
                value={auth.user.name}
                 />                
              </div>

              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input 
                type="text"
                name='rollno'
                readOnly
                value={auth.user.rollno}
                 />
              </div>

              <div className="input-field">
                <i className="fas fa-calendar-alt"></i>
                <input 
                type="text"
                name='year'
                placeholder='Year'
                value={year}                
                onChange = {e => onChange(e)}
                 />
              </div>

              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input 
                type="text"
                name='division'
                placeholder='Division'
                value={division}
                onChange={e=> onChange(e)}
                 />
              </div>

              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input 
                type="text"
                name='batch'
                placeholder='Batch'
                value = {batch}
                onChange={ e=> onChange(e) }
                 />
              </div>

              <input type="submit" className="btn solid" value="Submit Details" />
              
            </form>
          </div>
        </div>
        </>
      )
    }
    else{
      return( <Redirect to='/dashboard' /> )
    }
  }else{
    return (<Navbar />)
  }
};

StudentDetail.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  createDetail: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  std_details: state.std_details
})

export default connect(mapStateToProps,{logout,loadUser,createDetail})(StudentDetail);
