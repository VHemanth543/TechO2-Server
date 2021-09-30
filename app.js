const express = require('express');

const body = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const FormData = require('./model/form')

const app = express();



const dbUrl = "mongodb+srv://Vhemanth:SrinivasulU@cluster0.w5rm5.mongodb.net/TechO2Data?retryWrites=true&w=majority"



mongoose.connect(dbUrl, {useNewUrlParser : true , useUnifiedTopology : true})
.then((res)=> console.log("Server connected"))
.catch((err)=> console.log("error" + err))

app.use(cors());

app.use(express.urlencoded({extended : true}));
app.use(body.json());



app.get('/get-users' , async (req , res)=>{
    const user = await FormData.find({});
    res.json({
        length : user.length,
        user : user
    });
})

app.post('/login', async(req, res)=> {
    const {email, password} = req.body;
    const data = FormData.findOne({email:email}).then(user => {
        if(user.password == password){
            res.json({
                code : 200,
                message : "LoginSuccess",
                user : user 
            })
        }
        else
        {
            res
            .json({
                code : 404,
                message : "Login Failure"
            })
        }

    })
})


app.post('/add' , async(req , res)=>{
    const {firstName , lastName ,Type, email , Password, phone } = req.body;

    console.log(firstName + "\n" + lastName +"\n"+ email +"\n" + Type + "\n" + Password + "\n" )

    FormData.findOne({email : email}).then(user =>{
        if(user){
            res.json({
                code : 300,
                message : "user already present"
            });
        }else{
           const Forms = new FormData({
            
            firstName : firstName,
            lastName : lastName,
            Type: Type,
            email : email,
            password : Password,
            phone : phone
           });

           Forms.save().then(user =>{
               if(user){
                res.json({
                    code : 201,
                    message : Forms
                })
               }
           })
        }
    })


})

app.delete('/delete', async (req,res)=>{
    const {email} = req.body
   
    const deleted = FormData.findOneAndDelete({email : email}, (err)=>{
       if(err){
           res.json({
               code : 404,
               status : "Error",
               message : "some error occured",
               error : err
           })
       }
       else{
           res.json({
               code : 220,
               status : "success",
               message : "User accout deleted successfully",
               
           })
       }
   }) 
})

app.listen(8000);
