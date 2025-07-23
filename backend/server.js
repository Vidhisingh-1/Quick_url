const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const cors=require('cors');
const port=process.env.port || 8081 ;
const urlroutes=require('./routes/urlroutes');
const connectDB=require("./configs/mongodbconnection");
const { sanitizeinput } = require("./middlewares/sanitizeinput");
const limiter = require("./middlewares/rateLimiter");

app.use(cors());

connectDB();

app.use(express.json());

app.use(sanitizeinput);

app.use(limiter);

app.use('/api',urlroutes);

app.get("/",(req,res)=>{
    res.send("Hello ! Welcome to URL Shortener API");
})


app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.status|| 500).json({
        error:{
            message:err.message||'Internal Server error'
        }
    });
});

app.listen(port,()=>{ 
    console.log(`Server running on port ${port}`);
});
