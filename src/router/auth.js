const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const router=express.Router()
require("../db/conn")

const User=require("../model/userSchema")

router.get("/",(req,res)=>{
    res.send("hello home page")
})


// signup router
router.post("/signup", async (req,res)=>{

    const{name,email,phone,profile,password,cpassword}=req.body
    console.log(req.body)
    if (!name || !email || !phone || !profile || !password || !cpassword){
        return res.json({error:"plz filled the field properly"})
    }
    try {
        const userExist=await User.findOne({email:email}) 
        if (userExist){
            return res.status(422).json({error:"user already exist"})
        }
        const user=new User({name,email,phone,profile,password,cpassword})
        const userInfo=await user.save()
        res.status(200).json({message:"user successfully register"})

    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
    
})

// signin router
router.post("/signin",async(req,res)=>{
    const {email,password}=req.body
    if (!email || !password){
        return res.send("plz fill the field")
        
        
    }
    try {
        const emailExist=await User.findOne({email:email})
        

        if (emailExist){
            // bcrypt validation
            const isValid=bcrypt.compare(password,emailExist.password)
            
            // token part
            const token=await emailExist.generateToken()
            console.log(token)

            // cookie
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })

            if (!isValid){
                res.status(400).send("invalid login id")
            }
            else{
                res.send({message:"login successful"})
            }
        }
        else{
            res.status(400).send("invalid login id")
        }
    } catch (error) {
       res.send(error)
       console.log(error) 
    }
})
module.exports=router