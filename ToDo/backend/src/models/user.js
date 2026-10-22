const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema);