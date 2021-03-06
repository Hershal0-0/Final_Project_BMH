const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rollno:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true
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

const UserInfo = mongoose.model('user_info',UserSchema)

module.exports = UserInfo