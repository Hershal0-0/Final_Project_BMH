import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../style/signin_signup.css'

// import Redux related
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import PropTypes from 'prop-types'

const Login = ({login,isAuthenticated}) => {
    
    
    function handleSignUp(){
        document.body.querySelector(".container").classList.add("sign-up-mode");        
    }    

    function handleSignIn(){
        document.body.querySelector(".container").classList.remove("sign-up-mode");   
    }
    const [loginFormData,setLoginFormData]=useState({
        email:"",
        password:""
    })
    const {email,password} = loginFormData

    const onChange= (e)=>{
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        login({email,password})
    }

    // Redirect if Logged in 
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }
    
    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                <form className="sign-in-form" onSubmit={e => handleSubmit(e)} >
                    <h2 className="title">Sign In</h2>

                    <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                        type="email" 
                        placeholder="Email"
                        name="email" 
                        value={email}
                        onChange = {e=>onChange(e)}
                        required
                        />
                    </div>

                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password" 
                            value={password}
                            onChange = {e=>onChange(e)}
                            required
                            />
                    </div>

                    <input type="submit"  className="btn solid" value="Login"/>
                    
                </form>
                <form action="#" className="sign-up-form">
                    <h2 className="title">Sign In</h2>

                    <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                    </div>

                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    
                    <input type="submit"  className="btn solid" value="Login"/>
                    
                </form>
                </div>
            </div>

        <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={()=>handleSignUp()}>
              Sign up
            </button>
          </div>
          <img src="/Users/hershalrao/Desktop/Final_Project_BMH/client/src/svg/maker_launch.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={()=>handleSignIn()}>
              Sign in
            </button>
          </div>
          <img src="svg/register.svg" className="image" alt="" />
        </div>
      </div>
        </div>
    )
}

Login.propTypes = {
    login : PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)

                
                