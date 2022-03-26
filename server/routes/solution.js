const express = require('express')
const {check,validationResult} = require('express-validator')

// Importing Mongoose Model
const Solution = require('../models/Solution')
const UserInfo = require('../models/UserInfo')
const Problem = require('../models/Problem')
// Importing Middlewarr
const auth = require('../middleware/auth')

const router = express.Router()

// @route POST api/solution
// @desc Create a Solution
// @acess Private
router.post('/',[auth,[
    check('problem_id',"Problem Id is Reequired").not().isEmpty(),
    check('code',"Code is Reequired").not().isEmpty(),
    check('language',"Programming Language is Required").not().isEmpty()
]],async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    
    try {
        console.log(req.body,req.user.id);
        const user = await UserInfo.findById(req.user.id).select('-password')
        const problem = await Problem.findById(req.body.problem_id)
        if(!problem){
        return res.status(400).json({
            errors: [{msg: "Problem Id is Invalid Try Again"}]
        })
    }
        // const newSolution = {
        //     student_id: req.user.id,
        //     problem_id: req.body.problem_id,
        //     name:user.name,
        //     language: req.body.language,
        //     code: req.body.code
        // }
        // const solution = new Solution(newSolution)
        //await solution.save()
        const res = await Solution.findOneAndUpdate(
            {student_id : req.user.id, problem_id : req.body.problem_id},
            {$set : {name : user.name , language: req.body.langauge, code: req.body.code}},
            {upsert : true}
        );
        res.json(res.name)
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router