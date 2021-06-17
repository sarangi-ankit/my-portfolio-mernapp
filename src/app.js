const dotenv=require('dotenv')
const express=require("express")
const app=express()

// app.use(express.urlencoded({extended:false}));
app.use(express.json())
dotenv.config({path:"./src/config.env"})
// require("./db/conn")



// middleware for router
app.use(require("./router/auth"))

const port=process.env.PORT


 
// middleware
const middleware=(req,res,next)=>{
    console.log("hello middleware")
    next()
}

app.get("/",(req,res)=>[
    res.send("welcome to my home page")
])

app.get("/about",middleware,(req,res)=>[
    res.send("welcome to my about page")
])

app.get("/contact",(req,res)=>[
    res.send("welcome to my contact page")
])

app.get("/signup",(req,res)=>[
    res.send("welcome to my signup page")
])

app.get("/signin",(req,res)=>[
    res.send("welcome to my signin page")
])

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})