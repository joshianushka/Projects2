const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db.js");
const app=express();
const taskRoutes=require("./routes/taskRoutes.js");
const userRoutes=require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello");
});

app.use("/api/tasks",taskRoutes);
app.use("/api/user",userRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server running");
    });
});