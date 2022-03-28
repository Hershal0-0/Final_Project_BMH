const mongoose = require('mongoose')

const StudentDetailSchema = new mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_info'
    },
    name:{
        type:String,
        required: true
    },
    rollno:{
        type:String,
        required:true
    },
    year:{
        type: String,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    subject:[
        {
            facultyClass_id:{
                type: mongoose.Schema.Types.ObjectId,
                required:true
            },
            subject_name:{
                type: String,
                required:true
            },
            subject_abv:{
                type:String,
                required:true
            },
            faculty_name:{
                type:String,
                required:true
            }
        }
    ]
})

const StudentDetail = mongoose.model('student_detail',StudentDetailSchema)

module.exports = StudentDetail