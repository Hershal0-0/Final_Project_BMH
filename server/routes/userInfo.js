const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check,validationResult} = require("express-validator")

// Importing the Model
const UserInfo = require("../models/UserInfo")

const router = express.Router()

// @route POST api/users
// @desc  Register a New User
// @access Public
router.post("/",[
    check("name","Name is required").not().isEmpty(),
    check("designation","Designation is required").not().isEmpty(),
    check("email","Please Enter a Valid Email").isEmail(),
    check("password","Please Enter a password with 6 or more characters").isLength({
        min:6
    })
],async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {name,rollno,designation,email,password}=req.body

    try {
        // See if the user exists
        let user = await UserInfo.findOne({email})
        if (user) {
            return res.status(400).json({
                errors: [{msg: "User Already Exists" }]
            })
        }
        if(designation=="Faculty" || designation=="Student"){
            console.log(designation)            
        }else{
            return res.status(400).json({
                errors:[{msg:"Invalid designation, Try Again44"}]
            })
        }
        user = new UserInfo({
            name,
            rollno,
            designation,
            email,
            password
        })
        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)

        await user.save();
        

        // Return JWT
        const payload = {
            user:{
                id : user._id
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
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router