const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {exec,execSync} = require('child_process');
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
		
		case 'python':
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

			exec(`timeout -s SIGKILL 2 python3 ./code/test.py <./code/input${ind}.txt`, {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
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
						result[ind]=stdout
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


			fs.writeFile('./code/test.cpp',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});					

			exec("timeout -s SIGKILL 5 g++ ./code/test.cpp -o ./code/test -lm",{maxBuffer: 1024 * 999999999999999999}, (err,stdout,stderr)=>{
				if(err){
					result2['error'] = err.message;
				}
				if(stderr){
					result2['error'] = err.message;
				}
			});
			
			let val2 = 1		
			problem.testcases.map(testcase=>{
				const fd = "./code/input"+val2.toString()+".txt"
				fs.writeFile(fd,testcase.input,(err)=>{
					if(err){
						console.log(err)
					}
				})
				val2++
			})
			val2 = 1
			
			let result2 = {}


		setTimeout(()=>{
				problem.testcases.map((testcase,index)=>{
				let code,code_error=false,code_output,timeout = false;
				let ind=index+1


			exec(`timeout -s SIGKILL 5 ./code/test <./code/input${ind}.txt`, {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
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
						result2[ind]= stderr;
						return
					}
					if(timeout){
						timeout = false;
						result2[ind]="Timed Out"
						return 
					}
					else if(!code_error && !timeout){
						result2[ind]=stdout
						return 
					}
				}
			});			
			});},3000);
			


			setTimeout(()=>{
				if(result2.length!=0){
					score = 0;
					problem.testcases.map((testcase,index)=>{
						result2[problem.testcases.length+index+1]=testcase.output;
						if (testcase.output== result2[index+1]){
							score++;
						}
					})
					result2["score"]=score;
					result2["length"] = problem.testcases.length;
					res.json(result2);
				}
			},6000);

			break;

//FOR C
		case 'c':

		
			fs.writeFile('./code/test.c',req.body.code,(err)=>{
				if(err){
					console.log(err);
				}
			});					

			exec("timeout -s SIGKILL 5 gcc ./code/test.c -o ./code/test -lm",{maxBuffer: 1024 * 999999999999999999}, (err,stdout,stderr)=>{
				if(err){
					result3['error'] = err.message;
				}
				if(stderr){
					result3['error'] = err.message;
				}
			});
			
			let val3 = 1		
			problem.testcases.map(testcase=>{
				const fd = "./code/input"+val3.toString()+".txt"
				fs.writeFile(fd,testcase.input,(err)=>{
					if(err){
						console.log(err)
					}
				})
				val3++
			})
			val3 = 1
			
			let result3 = {}


		setTimeout(()=>{
				problem.testcases.map((testcase,index)=>{
				let code,code_error=false,code_output,timeout = false;
				let ind=index+1


			exec(`timeout -s SIGKILL 5 ./code/test <./code/input${ind}.txt`, {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
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
						result3[ind]= stderr;
						return
					}
					if(timeout){
						timeout = false;
						result3[ind]="Timed Out"
						return 
					}
					else if(!code_error && !timeout){
						result3[ind]=stdout
						return 
					}
				}
			});			
			});},3000);
			


			setTimeout(()=>{
				if(result3.length!=0){
					score = 0;
					problem.testcases.map((testcase,index)=>{
						result3[problem.testcases.length+index+1]=testcase.output;
						if (testcase.output== result3[index+1]){
							score++;
						}
					})
					result3["score"]=score;
					result3["length"] = problem.testcases.length;
					res.json(result3);
				}
			},6000);

			break;


//FOR JAVA
	    case 'java':

	    	const regex = /public class [A-Z][a-z]*/;
	    	let str = req.body.code.replace(regex,'public class Test');

			fs.writeFile('Test.java',str,(err)=>{
				if(err){
					console.log(err);
				}
			});
			exec("timeout -s SIGKILL 5 javac Test.java",{maxBuffer: 1024 * 999999999999999999}, (err,stdout,stderr)=>{
				if(err){
					result4['error'] = err.message;
				}
				if(stderr){
					result4['error'] = err.message;
				}
			});
			
			let val4 = 1		
			problem.testcases.map(testcase=>{
				const fd = "./code/input"+val4.toString()+".txt"
				fs.writeFile(fd,testcase.input,(err)=>{
					if(err){
						console.log(err)
					}
				})
				val4++
			})
			val4 = 1
			
			let result4 = {}


			setTimeout(()=>{
					problem.testcases.map((testcase,index)=>{
					let code,code_error=false,code_output,timeout = false;
					let ind=index+1


				exec(`timeout -s SIGKILL 2 java Test <./code/input${ind}.txt`, {maxBuffer: 1024 * 999999999999999999} ,(err,stdout,stderr)=>{
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
							result4[ind]= stderr;
							return
						}
						if(timeout){
							timeout = false;
							result4[ind]="Timed Out"
							return 
						}
						else if(!code_error && !timeout){
							result4[ind]=stdout
							return 
						}
					}
				});			
				});},3000);
			
				setTimeout(()=>{
					fs.unlink('Test.class',(err)=>{
						if(err){
							console.log(err);
						}
					});
				},6000);

				setTimeout(()=>{
					if(result4.length!=0){
						score = 0;
						problem.testcases.map((testcase,index)=>{
							result4[problem.testcases.length+index+1]=testcase.output;
							if (testcase.output== result4[index+1]){
								score++;
							}
						})
						result4["score"]=score;
						result4["length"] = problem.testcases.length;
						res.json(result4);
					}
				},7000);

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