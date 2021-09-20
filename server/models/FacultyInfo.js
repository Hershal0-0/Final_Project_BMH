const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    emp_no:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const FacultyInfo = mongoose.model('faculty_info',UserSchema)

module.exports = FacultyInfo