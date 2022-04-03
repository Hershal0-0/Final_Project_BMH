const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require("colors")

const multer  = require('multer')
const { exec }= require('child_process');
const upload = multer({ dest: 'uploads/' })
var formidable = require('formidable');
var util = require('util');


// importing routes
const codex = require("./codex")
const userInfo = require("./routes/userInfo")
const solution = require('./routes/solution')
const problem = require('./routes/problem')
const auth = require("./routes/auth")
const student_details = require('./routes/student_details')
const faculty_class = require('./routes/faculty_class')
const plag_check = require('./routes/plag_check')

 
// For Using Imp Environment Variables
dotenv.config({path: "./config/config.env"})

// Importing The Function To Connect The MongoDB database
const connectDB = require("./config/db_conn")
// Connecting To MongoDB
connectDB()

// Creating The Express App
const app = express();
app.use(cors());

// New Way of Body Parser Middleware
app.use(express.json());
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// Endpoints

// Test End Point
app.get("/",(req,res,next)=>{
    console.log("Backend Api is Running")
})

// Using the Imported Routes
app.use('/api/code',codex)
app.use('/api/user',userInfo)
app.use('/api/auth',auth)
app.use('/api/solution',solution)
app.use('/api/problem',problem)
app.use('/api/student_detail',student_details)
app.use('/api/faculty_class',faculty_class)
app.use('/api/plag_check',plag_check)

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
});