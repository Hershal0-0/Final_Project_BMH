const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema({
    faculty_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_info'
    },
    faculty_name:{
        type:String,
        required: true
    },
    class_name:{
        type:String,
        required:true
    },
    class_abv:{
        type:String,
        required:true 
    },
    year:{
        type:String,
        required:true
    },
    students:[
        {
            student_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'user_info'
            },
            std_name:{
                type:String,
                required:true
            },
            std_rollno:{
                type:String,
                required:true
            }
        }
    ]  ,
    problems:[
        {
            problem_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'problem'
            },
            problem_title:{
                type:String,
                required:true
            },
            problem_statement:{
                type:String,
                required:true
            }
        }
    ]
})

const FacultyClass = mongoose.model('faculty_class_detail',FacultySchema)

module.exports = FacultyClass