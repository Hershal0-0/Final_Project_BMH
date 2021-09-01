const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {exec} = require('child_process');


router.route('/:lang').post(function(req,res){
		
	
	//console.log(req.body.code);
	switch(req.params.lang){
		case 'py':
// FOR PYTHON			
			fs.writeFile('./code/test.py',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});
			let code,code_error=false,code_output,timeout = false;
			exec("timeout -s SIGKILL 5 python3 ./code/test.py <./code/input.txt", {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
				if(err){
					console.log('err' + err.message);
				}
				if(stderr){
					code_error = true;
				}
				exec("echp $?",(err,stdout,stderr)=>{
					 code = stdout;
				});
				if(code == 137){
					timeout = true;
				}
				else{
					if(code_error){
						code_error = false;
						return res.end(stderr);
					}
					if(timeout){
						timeout = false;
						return res.end("Timed Out");
					}
					else if(!code_error && !timeout){
						console.log(stdout);
						return res.end(stdout);
					}
				}
			});
			break;

//FOR CPP
		case 'cpp':
			fs.writeFile('./code/test.c',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});

			exec("timeout -s SIGKILl 5 g++ ./code/test.c -o ./code/test",{maxBuffer: 1024 * 999999999999999999}, (err,stdout,stderr)=>{
				if(err){
					return res.end(err.message);
				}
				if(stderr){
					return res.end(stderr);
				}
			});

			exec("timeout -s SIGKILl 5 ./code/test <./code/input.txt",{maxBuffer: 1024 * 999999999999999999},(err,stdout,stderr)=>{
				if(err){
					return res.end(err.message);
				}
				if(stderr){
					return res.end(stderr);
				}
				else{
					return res.end(stdout);
				}
			} );
			break;

//FOR JAVA
	    case 'java':
			fs.writeFile('./code/test.java',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});
			break;

//DEFAULT CASE
		default:
			console.log("Wrong language");
			res.send("WRONG LANGUAGE");
	}
	
});


module.exports = router;