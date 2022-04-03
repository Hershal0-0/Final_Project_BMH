const express = require('express')
const {check, validationResult} = require('express-validator')

const auth = require('../middleware/auth')

const router = express.Router()
const Solution = require('../models/Solution')
const UserInfo = require('../models/UserInfo')
const Problem = require('../models/Problem')
const PlagReport = require('../models/PlagReport')

const fs = require('fs');
const {exec,execSync} = require('child_process');


router.get('/generate/',[auth],async (req,res,next)=>{
    try{
        const sols = await Solution.find({});        
        arr1 = []
        for(let i = 0;i<sols.length-1;i++){
            for(let j = i+1;j < sols.length;j++){
                if(JSON.stringify(sols[i]['student_id'] !== JSON.stringify(sols[j]['student_id']))){
                    if(JSON.stringify(sols[i]['problem_id']) == JSON.stringify(sols[j]['problem_id']) && sols[i]['language'] == sols[j]['language']){
                        arr1.push([sols[i],sols[j]]);
                    }
                }
            }
        }


        result = []

        for(let i = 0; i < arr1.length; i++){
            user1 = await UserInfo.findById({_id : arr1[i][0]['student_id']});
            user2 = await UserInfo.findById({_id : arr1[i][1]['student_id']});
            prob = await Problem.findById({_id: arr1[i][0]['problem_id']});

            test_result = {
                'problem_id' : arr1[i][0]['problem_id'],
                'problem_title' : prob['problem_title'],
                'faculty_id': prob['faculty_id'],
                'faculty_name' : prob['faculty_name']
            }
            firstUser = {
                'student_id' : user1['_id'],
                'rollno' : user1['rollno'],
                'name' : user1['name'],
                'code' : arr1[i][0]['code']                
            }
            secondUser = {
                'student_id' : user2['_id'],
                'rollno' : user2['rollno'],
                'name' : user2['name'],
                'code' : arr1[i][1]['code']                
            }
                        
            fs.writeFileSync('./demo/1.txt',firstUser.code);
            fs.writeFileSync('./demo/2.txt',secondUser.code);

            let ans = execSync('python ./demo/test.py').toString();
            
            ans = ans.split('\n');
            test_result['firstStudent'] = firstUser;
            test_result['secondStudent'] = secondUser;
            test_result['plagarism'] = {
                'firstStudent' : Number(ans[0]),
                'secondStudent' : Number(ans[1])
            }
            result.push(test_result);
        }

        const plagReports = await PlagReport.find({});
        if(plagReports.length !=0){
            await PlagReport.deleteOne({});
        }
        const dbResult = new PlagReport({report: result});
        await dbResult.save();

        console.log([...result])
        res.send(dbResult);
        
    }
    catch(Error){
        console.log("Error",Error);
    }
});


router.get('/records',[auth],async (req,res,next)=>{
    try{
        const record = await PlagReport.find({});
        res.json(record);
    }catch(Error){
        console.log(Error);
    }
})

module.exports = router;