const express = require('express')
const {check, validationResult} = require('express-validator')

const auth = require('../middleware/auth')

const router = express.Router()
const Solution = require('../models/Solution')
const UserInfo = require('../models/UserInfo')

router.get('/',async (req,res,next)=>{
    try{
        const sols = await Solution.find({});
        console.log(sols)
        arr1=[]
        sols.forEach((solution)=>{
            let arr = sols.filter((solution1)=> {
                if(JSON.stringify(solution.student_id) !== JSON.stringify(solution1.student_id)){
                    if(JSON.stringify(solution.problem_id) == JSON.stringify(solution1.problem_id) && solution.language == solution1.language){
                        arr1.push([solution.student_id,solution1.student_id])
                    }
                }
            })
           
        })
        console.log(arr1);
        
        res.send(arr1);
        
    }
    catch{
        console.log("Error");
    }
});


module.exports = router;