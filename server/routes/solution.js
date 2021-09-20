const express = require('express')
const {check,validationResult} = require('express-validator')

// Importing Mongoose Model
const Solution = require('../models/Solution')
const UserInfo = require('../models/UserInfo')
// Importing Middlewarr
const auth = require('../middleware/auth')

const router = express.Router()

// @route POST api/solution
// @desc Create a Solution
// @acess Private
router.post('/',[auth,[
    check('code',"Code is Reequired").not().isEmpty(),
    check('language',"Programming Language is Reequired").not().isEmpty()
]],async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const user = await UserInfo.findById(req.user.id).select('-password')
    try {
        const newSolution = {
            student_id: req.user.id,
            name:user.name,
            language: req.body.language,
            code: req.body.code
        }
        const solution = new Solution(newSolution)
        await solution.save()
        res.json(solution)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router