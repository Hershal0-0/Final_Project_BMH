const express = require('express')
const {check, validationResult} = require('express-validator')

// Importing mongoose models
const UserInfo = require('../models/UserInfo')
const FacultyClass = require('../models/FacultyClass')
const StudentDetail = require('../models/StudentDetail')
// Importing middleware
const auth = require('../middleware/auth')

const router = express.Router()

// @route GET api/faculty_class
// @desc GET all classes by a specific faculty
// @acess Private
router.get('/',[auth],async(req,res,next)=>{
    try {
        const fac_class =  await FacultyClass.find({faculty_id:req.user.id})
        res.json(fac_class)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error") 
    }
})

// @route GET api/faculty_class/:id
// @desc GET all classes by a specific class_id
// @acess Private
router.get('/:id',[auth],async(req,res,next)=>{
    try {
        const fac_class = await FacultyClass.findById(req.params.id)
        res.json(fac_class)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error") 
    }
})


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
        if(req.body.students!=null){
            console.log("first")
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
            setTimeout(async()=>{
                if(students_obj.length==req.body.students.length){
                    newClass.students=students_obj
                    const faculty_class = new FacultyClass(newClass)
                    await faculty_class.save()
                    std_arr.forEach(async(std_id)=>{
                        const std_detail = await StudentDetail.findOneAndUpdate(
                            {student_id: std_id},
                            {$push: {"subject":{
                                facultyClass_id: faculty_class._id,
                                subject_name: faculty_class.class_name,
                                subject_abv: faculty_class.class_abv,
                                faculty_name: faculty_class.faculty_name,
                            }}},
                            {safe:true}
                            )
                    })
                    res.json(faculty_class)
                }
            },2000)
                    
        }
        else{
            const faculty_class = new FacultyClass(newClass)
            await faculty_class.save()
            res.json(faculty_class)
        }
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