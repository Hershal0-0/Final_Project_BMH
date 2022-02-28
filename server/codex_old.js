const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {exec} = require('child_process');
const {check,validationResult} = require('express-validator')

// importing models
const Problem = require('./models/Problem')


router.post('/:lang',[
	check('problem_id',"Problem Id is Required").not().isEmpty()
],async(req,res,next)=>{
		try {
			const problem = await Problem.findById(req.body.problem_id)
			// console.log(problem)
	switch(req.params.lang){
		case 'Python':
// FOR PYTHON			
			fs.writeFile('./code/test.py',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});
			let val = 1		
			problem.testcases.map(testcase=>{
				const fd = "./code/input"+val.toString()+".txt"
				fs.writeFile(fd,testcase.input,(err)=>{
					if(err){
						console.log(err)
					}
				})
				val++
			})
			val = 1
			
			let result = {}
			problem.testcases.map((testcase,index)=>{
				let code,code_error=false,code_output,timeout = false;
				let ind=index+1

			exec(`timeout -s SIGKILL 5 python3 ./code/test.py <./code/input${ind}.txt`, {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
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
						result[ind]= stderr;
						return
					}
					if(timeout){
						timeout = false;
						result[ind]="Timed Out"
						return 
					}
					else if(!code_error && !timeout){
						const new_stdout = stdout.replace(/^\s+|\s+$/g, '')
						result[ind]=new_stdout
						return 
					}
				}
			});
			
			})
			setTimeout(()=>{
				if(result.length!=0){
					score = 0
					problem.testcases.map((testcase,index)=>{
						result[problem.testcases.length+index+1]=testcase.output
						if (testcase.output== result[index+1]){
							score++;
						}
					})
					result["score"]=score;
					result["length"] = problem.testcases.length
					res.json(result)
				}
			},3000)
			
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
		} catch (err) {
			console.error(err.message)
			res.status(500).send("Server Error")
		}	
});


module.exports = router;