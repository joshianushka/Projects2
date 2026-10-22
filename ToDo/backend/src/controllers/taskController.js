const task=require("../models/task.js");

const createTask=async(req,res)=>{
    try{
        const{title,status}=req.body;
        if(!title){
            return res.status(400).json({
                message:"title is required"
            })
        }
        const newtask=await task.create({
          title,status,
          user:req.existing._id
        });
        console.log(req.body);
        res.status(201).json({
          message:"task created",
          newtask
      })

    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}

const updateTask=async(req,res)=>{
    try{
        const taskfound=await task.findOne({
            _id:req.params.id,
            user:req.existing._id
        });
        if(!taskfound){
            return res.status(404).json({
                message:"task not found"
            });
        }
        const{title,status}=req.body;
        if(title!==undefined){
            taskfound.title=title;
        }
        if(status!==undefined){
            taskfound.status=status;
        }
        await taskfound.save();
        res.status(200).json({
            message:"task updated",
            taskfound
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}

const deleteTask=async(req,res)=>{
    try{
        const taskfound=await task.findOne({
            _id:req.params.id,
            user:req.existing._id
        })
        if(!taskfound){
            return res.status(404).json({
                message:"task not found"
            })
        }
        await taskfound.deleteOne();
        res.status(200).json({
            message:"task deleted",
            taskfound
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            message:"server error"
        })
    }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await task.find({
      user: req.existing._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};


module.exports={
    createTask,
    updateTask,
    deleteTask,
    getTasks
}

