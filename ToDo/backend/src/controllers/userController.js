const user=require("../models/user.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const validator=require("validator");

const signup=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"fill all fields"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message:"invalid email"
            })
        }
        //if(!validator.isStrongPassword(password)){
        //    res.status(400).json({
        //        message:"password is not strong"
        //    })
        //}

        const existing=await user.findOne({email});
        if(existing){
            return res.status(400).json({
                message:"user already exists"
            })
        }
        const hashedpwd=await bcrypt.hash(password,10);
        const newuser=await user.create({name,email,password:hashedpwd});
        res.status(201).json({
            message:"user created",
            newuser
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"fill all fields"
            })
        }
        const existing=await user.findOne({email});
        if(!existing){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        const userexists=await bcrypt.compare(password,existing.password);
        if(!userexists){
            return res.status(401).json({
                message:"invalid email or password"
            })
        }
        const token=jwt.sign({id:existing._id},process.env.JWT_SECRET,{
            expiresIn:"1h"
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:3600000
        });
        res.status(200).json({
            message:"login successful",
            token,
            user:{
                name:existing.name,
                email:existing.email
            }
            
        })
    
            
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}

module.exports={signup,login};
