const express = require("express")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const {check,validationResult} = require("express-validator")

// Importing the DB Models
const UserInfo = require('../models/UserInfo')

// Importing The Auth Middleware
const auth = require("../middleware/auth")

const router = express.Router()

// @route GET api/auth
// @desc Test Route to check middleware
// @access Public
router.get("/",auth,async(req,res,next)=>{
    try {
        const user = await UserInfo.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            errors:[{msg:"Server Error"}]
        })
    }
    
})

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post("/",[
    
    check("email","Please Enter a Valid Email").isEmail(),
    check("password","Password is required").exists()

], async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password} = req.body

    try {
        // See if the user exists
        let user = await UserInfo.findOne({email})
        if (!user) {
             return res.status(400).json({
                errors: [{msg: "Invalid Credentials,no user found" }]
            })
        }        
        // checking the credentials to the database
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                errors:[{msg:"Invalid Credentials,wrong password"}]
            })
        }

        // Return JWT
        const payload = {
            user:{
                id : user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWTSECRET,
            {expiresIn : 36000 },
            (err,token)=>{
                if(err) throw err
                res.json({token})
            })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

    
})



module.exports = router