const express = require('express')
const {check, validationResult} = require('express-validator')

// Importing mongoose models
const UserInfo = require('../models/UserInfo')
const FacultyClass = require('../models/FacultyClass')

// Importing middleware
const auth = require('../middleware/auth')

const router = express.Router()

// @route POST api/faculty_class
// @desc Create a class
// @acess Private
router.post('/',[auth,[
    check('class_name',"Class Name is Required").not().isEmpty(),
    check('class_abv',"Class Acronym is Required").not().isEmpty(),
    check('year',"Class year is required").not().isEmpty()
]],async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const faculty = await UserInfo.findById(req.user.id).select('-password')
        const newClass = {
            faculty_id : req.user.id,
            faculty_name : faculty.name,
            year: req.body.year,
            class_name: req.body.class_name,
            class_abv : req.body.class_abv
        }
        const faculty_class = new FacultyClass(newClass)
        await faculty_class.save()
        res.json(faculty_class)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route PUT api/faculty_class
// @desc Add students to the class
// @acess Private

router.put('/',[auth,[
    check('class_id',"Class id is required").not().isEmpty(),
    check('students',"Student Details are required").not().isEmpty()
]],async (req,res,next)=>{
    std_arr = req.body.students
    students_obj = []
    std_arr.forEach(async std_id => {
        let std_obj = {}
        const student = await UserInfo.findById(std_id)
        std_obj={
            student_id: std_id,
            std_name: student.name,
            std_rollno: student.rollno
        }
        students_obj.push(std_obj)
        

    });
    
        const faculty_class = await FacultyClass.findById(req.body.class_id)
        faculty_class.students = students_obj
        await faculty_class.save()
        res.json(faculty_class)
        
    

})

module.exports = router