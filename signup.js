const express=require("express")
const sign=express.Router()
const {User,Post}=require("./mongo.js")
sign.use(async(req,res,next)=>{
    const {Name,Email,Password}=req.body
    console.log(Name,Email,Password)
    try{
        const exists=await User.findOne({Email})

    if(exists){
        res.status(401).json({message:"Email Exists!"})
    }else{
        next()
    }
    }catch(e){
        console.log("error😔",e)
    }
})
sign.post("/",(req,res)=>{
    const {Name,Email,Password}=req.body
    console.log(Name,Email,Password)
    try{
        User.insertMany({Name:Name,Email:Email,Password:Password})
        console.log("inserted User😎")
        res.status(200).json({message:"Inseted"})
    }catch(e){
        console.log("error at inserting use😔",e)
    }
})
module.exports=sign;