const express=require("express")
const app=express()
const cors=require("cors")
const {User,Post}=require("./mongo.js")
const sign=require("./signup.js")
const login = require("./login.js")
const blog = require("./blog.js")
const parser=require("cookie-parser")
app.use(parser())

port=5000;
app.use(express.json())
app.use(cors({
    origin:"https://refcookief-f1.vercel.app",
    credentials:true
}))




require('dotenv').config()
app.use("/Signup",sign)
app.use("/Login",login)
app.use("/Blog",blog)
app.get("/",(req,res)=>{
    res.cookie("to","hii",{httpOnly:true,secure:true,sameSite:"none"}).send("<h1>Hello world</h1>")

})
app.listen(port,()=>{
    console.log(`The server is working on ${port}...`)
})