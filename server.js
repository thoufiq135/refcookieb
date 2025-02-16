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
    origin:"http://localhost:5173",
    credentials:true
}))




require('dotenv').config()
app.use("/Signup",sign)
app.use("/Login",login)
app.use("/Blog",blog)
app.get("/",(req,res)=>{
    res.cookie("to","hii",{path:"/Login",httpOnly:true}).send("<h1>Hello world</h1>")

})
app.listen(port,()=>{
    console.log(`The server is working on ${port}...`)
})