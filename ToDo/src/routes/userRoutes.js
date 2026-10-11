const express=require("express");
const router=express.Router();
const {signup,login}=require("../controllers/userController.js");


router.post("/register",signup);
router.post("/login",login);

module.exports=router;
