const express=require("express");
const router=express.Router();
const protect=require("../middleware/userAuth.js");
const {createTask,updateTask,deleteTask}=require("../controllers/taskController.js");

router.post("/",protect,createTask);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deleteTask);

module.exports=router;
