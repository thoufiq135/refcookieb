const express=require("express")
const login=express.Router()
const {User,Post}=require("./mongo.js")
const jwt=require("jsonwebtoken")
require("dotenv").config()
login.use(async(req,res,next)=>{
    const {Email,Password}=req.body    
    const exists=await User.findOne({Email})
    if(!exists){
        res.status(401).json({message:"User not exists!"})
    }else if(exists.Password!==Password){
        res.status(404).json({message:"Wromg password!"})
    }else{
        next()
    }
})
login.post("/",(req,res)=>{
    const {Email,Password}=req.body
    console.log(Email,Password)
    const payload={Email:Email,Password:Password}
    const token=jwt.sign(payload,process.env.Key)
    console.log(token)
    res.cookie("token",token).status(200).json({message:"cookie set"})
})
module.exports=login;