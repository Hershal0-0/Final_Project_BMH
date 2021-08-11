const express = require('express');

const { exec }= require('child_process');
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var formidable = require('formidable');
var util = require('util');
const PORT = process.env.PORT || 6000;

app.use('/code',require('./app.js'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));