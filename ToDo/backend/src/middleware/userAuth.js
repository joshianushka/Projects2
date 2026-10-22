
const jwt=require("jsonwebtoken");
const user=require("../models/user.js");

const userAuth=async(req,res,next)=>{
    try{
        const{token}=req.cookies;
        if(!token){
            return res.status(401).json({
                message:"token not found"
            })
        }
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        const {id}=payload;
        if(!id){
            return res.status(401).json({
                message:"invalid token"
            })
        }
        const existing=await user.findById(id);
        if(!existing){
            return res.status(401).json({
                message:"user not found"
            })
        }
        req.existing=existing;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}
module.exports=userAuth;
