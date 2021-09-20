const mongoose = require('mongoose')

const ProblemSchema = new mongoose.Schema({
    faculty_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_info"
    },
    problem_statement:{
        type: String,
        required:true
    },
    faculty_name:{
        type:String,
        required: true
    },
    testcases:[
        {
            input:{
                type: String,
                required: true
            },
            output:{
                type: String,
                required: true
            }
        }
    ]    
})

const Problem = mongoose.model('problem',ProblemSchema)

module.exports = Problem