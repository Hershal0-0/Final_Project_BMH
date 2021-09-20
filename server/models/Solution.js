const mongoose = require('mongoose')

const SolutionSchema = new mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_info'
    },
    name:{
        type:String,
        required: true
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    result:{
        type:String        
    }
})

const Solution = mongoose.model('solution',SolutionSchema)

module.exports = Solution