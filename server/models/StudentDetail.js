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
            subject_name:{
                type: String,
            }
        }
    ]
})

const StudentDetail = mongoose.model('student_detail',StudentDetailSchema)

module.exports = StudentDetail