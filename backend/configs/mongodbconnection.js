const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected");
    }
    catch(error)
    {
        console.log('Error connecting to MongoDb');
    }
}
module.exports=connectDB;