const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGU).then(()=>console.log("Connected to mongo db🥳")).catch((e)=>console.log("error to connected mongodb",e))
const Userschema=new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String
})
const User=mongoose.model("User",Userschema)
const Postschema=new mongoose.Schema({
    Title:String,
    Content:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
})

const Post=mongoose.model("Post",Postschema)
module.exports={User,Post}