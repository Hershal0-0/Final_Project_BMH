const express = require('express')
const {check,validationResult} = require('express-validator')

// Importing Mongoose Model
const Problem = require('../models/Problem')
const UserInfo = require('../models/UserInfo')
const FacultyClass = require('../models/FacultyClass')
// Importing Middlewarr
const auth = require('../middleware/auth')

const router = express.Router()

// @route GET api/problem
// @desc Get All Problems
// @acess Public
router.get('/',async(req,res,next)=>{
    try {
       const problems = await Problem.find().select('-testcases')
       res.json(problems)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})



// @route POST api/problem
// @desc Create a Problem
// @acess Private
router.post('/',[auth,[
    check('problem_title',"Problem Title Is Required").not().isEmpty(),
    check('problem_statement',"Problem Statement is Required").not().isEmpty(),
    check('facultyClass_id',"FacultyClass Id is required").not().isEmpty()    
]],async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const user = await UserInfo.findById(req.user.id).select('-password')
    try {
        const newProblem = {
            faculty_id: req.user.id,
            faculty_name:user.name,
            problem_title:req.body.problem_title,
            problem_statement: req.body.problem_statement,            
        }
        const problem = new Problem(newProblem)
        await problem.save()
        const fac_class = await FacultyClass.findByIdAndUpdate(req.body.facultyClass_id,
            {
                $push: {"problems": { 
                    problem_id:problem._id, 
                    problem_title:req.body.problem_title,
                    problem_statement: req.body.problem_statement
                 }}},
            {safe:true,new:true})
        res.json({problem,fac_class})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }    
})

//  @route PUT api/problem
//  @desc Adding TestCases To The Coding Problem
//  @acess Private
router.put('/',[auth,[
    check("input","Input Is Required for a Test Case").not().isEmpty(),
    check("output","Output Is Required for a Test Case").not().isEmpty(),
    check("problem_id","Problem Id Is Required for adding a Test Case").not().isEmpty(),
]],async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            erros: errors.array()
        })
    }
    try {
        const problem = await Problem.findById(req.body.problem_id)
        if(!problem){
            return res.status(401).json({
                errors: [{msg: "Problem Id is Invalid Try Again"}]
            })
        }
        // problem.testcases.unshift({
        //     input:req.body.input,
        //     output:req.body.output
        // })
        // await problem.save()
        const prob1 = await Problem.findOneAndUpdate(
            {_id:req.body.problem_id},
            {$push : {"testcases": {
                input: req.body.input,
                output: req.body.output
            }}},
            {new:true}
        )
        res.json(prob1)

    } catch (err) {
        console.error(err.message)
        return res.status(501).send("Server Error")
    }
})

module.exports = router