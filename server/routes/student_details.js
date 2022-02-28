const express = require('express')
const {check, validationResult} = require('express-validator')

// Importing Mongoose Model
const StudentDetail = require('../models/StudentDetail')
const UserInfo = require('../models/UserInfo')

// Importing Middleware
const auth = require('../middleware/auth')



const router = express.Router()

// @route GET api/student_details
// @desc Get the specific student details
// @access Private
router.get('/',[auth],async(req,res,next) =>{
    try {
        const std_details = await StudentDetail.findOne({student_id:req.user.id})
        res.json(std_details)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route POST api/student_details
// @desc create a specific student detail
// @access Private
router.post('/',[auth,[
    check('year',"Your year is required").not().isEmpty(),
    check('division',"Your division is required").not().isEmpty(),
    check('batch','Your batch is required').not().isEmpty()

]],async(req,res,next)=>{
    const errors = validationResult(req)  
      if(!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array()
          })
      }
      try {
        const student = await UserInfo.findById(req.user.id).select('-password')
        // check if student detail exists
        const old_detail = await StudentDetail.findOne({student_id:req.user.id})
        console.log(old_detail);
        if(old_detail != null){
            old_detail.year = req.body.year
            old_detail.division = req.body.division
            old_detail.batch = req.body.batch
            
            await old_detail.save()
            res.json(old_detail)
        }else{
        const newStdDetails = {
            student_id : req.user.id,
            name: student.name,
            rollno: student.rollno,
            year: req.body.year,
            division: req.body.division,
            batch: req.body.batch
        }
        const stdDetail = new StudentDetail(newStdDetails)
        await stdDetail.save()
        res.json(stdDetail)

        }


        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route PUT api/student_details
// @desc add subjects to a specific student detail
// @access Private
router.put('/',[auth,[
    check('subject',"Your Subject is Required").not().isEmpty(),
    check('student_id',"Student Id is required").not().isEmpty()
]],async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const std_det = await StudentDetail.findOne({student_id:req.body.student_id})
        req.body.subject.forEach(element => {
            std_det.subject.unshift({
                subject_name:element
            })
        });
        await std_det.save()
        res.json(std_det)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router 