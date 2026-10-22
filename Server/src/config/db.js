import mongoose from "mongoose";


  const connectDB = async()=>{
    try{
    await mongoose.connect("mongodb+srv://ycollege4_db_user:Prince2004@leetcode.fozrdxq.mongodb.net/Leetcode")
    console.log("Database is connected")
    }
    catch(err){
         console.error("DataBase is not connected", err.message)
    }
  }

  export default connectDB;