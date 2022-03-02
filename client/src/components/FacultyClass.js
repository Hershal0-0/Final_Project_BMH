import React,{useEffect,useState} from 'react';
import ClassesContainer from './ClassesContainer';

// importing redux requirements
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { loadUser } from '../actions/auth';
import Navbar from './Navbar';


const FacultyClass = ({
    auth,
    isAuthenticated,
    loadUser
}) => {

    useEffect(()=>{
        loadUser()
    },[])

    const [content,setContent] = useState('my-classes')

    if(auth.user!== null){
        if(!isAuthenticated){
            return (<Redirect to='/login' />)
        }
        if(auth.user.designation === "Faculty"){
            return(
                <>
                <Navbar />
                <div>
                    Faculty Classes
                    <div style={{marginTop:"2rem"}}  className="d-flex justify-content-center">
                     <div className="d-flex faculty-container">
                    <div className="container-tabs d-flex">
                        <div onClick={()=>setContent('my-classes')}  className="tabs">My Classes</div>                        
                        <div onClick={()=>setContent('add-class')} className="tabs">Add Class</div>
                    </div>
                    <div className="faculty-container-main">
                        <ClassesContainer content = {content} />
                    </div>
                </div>
            </div> 
                </div>
                </>
            )

        }else{
            return(<Redirect to='/dashboard' />)
        }
    }else{
        return (<Navbar />)
    }

  
};

FacultyClass.propTypes = {
    auth: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loadUser})(FacultyClass)
