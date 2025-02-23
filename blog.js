const express=require("express")
const blog=express.Router()
const {User,Post}=require("./mongo.js")
const jwt=require("jsonwebtoken")
const { model } = require("mongoose")
require("dotenv").config()
blog.use(async(req,res,next)=>{
    try{
        const token=req.cookies.token
    if(token){
        console.log(token)
        const data=jwt.verify(token,process.env.KEY)
        if(!data){
            res.status(401)
        }else{
            const email=data.Email
            const user=await User.findOne({Email:email})
            req.user=user;    
            next()
        }
    }else{
        res.status(401).json({message:"token not found"})
    }
    
   
    }catch(e){
        res.status(401)
    }
})
blog.post("/",async(req,res)=>{
    const{Title,Content}=req.body
    const user=req.user

    console.log(Title,Content)

    if(Title&&Content){
        const newblog=Post.create({
            Title:Title,
            Content:Content,
            user:user._id
        }).then(()=>console.log("Inserted in database🥳👍😎")).catch((e)=>console.log("err at inserting blog😒😔"))
    }
   try{
    const post=await Post.find({user:user._id}).populate("user")

    res.status(200).json(post)
   }catch(e){
    console.log(e)
   }
    
})
blog.get("/All", async (req, res) => {
    try {
        const data=await Post.find({__v:0}).populate("user")
        
       
        res.status(200).json(data)
   
    } catch (e) {
        console.log("Error fetching posts:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports=blog;