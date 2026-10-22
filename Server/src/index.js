import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"

import cookieParser from "cookie-parser";
import authrouter from "./routes/userAuth.js";
import redisclient from "./config/redis.js";
const PORT = process.env.PORT || 3000; 
dotenv.config({ path: "../.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/user',authrouter);


 const initalizeConnection = async()=>{
      try{
        await Promise.all([connectDB(),redisclient.connect()]);
        console.log("database connected");
        app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
          })}
      catch(err){
           console.log(err);
      }
 }
  initalizeConnection();






