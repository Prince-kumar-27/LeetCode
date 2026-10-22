import redisclient from "../config/redis.js"
import User from "../models/user.js"
import validate from "../utils/validate.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//register function

 export const register = async (req,res)=>{
  try{
    

     validate(req.body);
     let {emailID,password}=req.body;
      req.body.role = "user";
       req.body.password = await bcrypt.hash(password,10);
      const user = await User.create(req.body);
     const token = jwt.sign({emailId:emailID,_id: user._id,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
     res.cookie('token',token,{maxAge:60*60*1000});
     res.status(201).send("User Registered Successfully");
    
    


  }
  catch(err){
     res.status(400).send("Error: "+ err);
  }
}
//login
 export const login = async(req,res)=>{
  try{
    const{emailID,password,role}=req.body;
    if(!emailID){
        throw new Error("Invalid Credentials");
    }
    if(!password){
        throw new Error("Password is wrong");
    }
    const user = await User.findOne({emailID});
    if (!user) {
  return res.status(404).send("User not found. Please register first.");
}
    
     const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Password is wrong");
    }
    const token = jwt.sign(
        {emailId:emailID,_id: user._id,role:role},
        process.env.JWT_KEY,
       {expiresIn: "1h" }) 

    res.cookie("token",token,{
        maxAge: 60 * 60 * 1000
    })
     res.status(200).send("Login successful");
  }
  catch(err){
      res.status(500).send("Error"+err.message);
  }
}
//logout     
 export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("No token found");
    }

    const payload = jwt.decode(token);

    // Mark token as blocked until its expiry
    await redisclient.set(`token:${token}`, "blocked", { EXAT: payload.exp });

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    res.send("Logged out successfully");
  } catch (err) {
    res.status(401).send(err.message || "Logout failed");
  }

 }
  //adminRegister

  export const adminRegister = async(req,res)=>{
     try{
    

     validate(req.body);
     let {emailID,password}=req.body;
      req.body.role = "admin";
       req.body.password = await bcrypt.hash(password,10);
      const user = await User.create(req.body);
     const token = jwt.sign({emailId:emailID,_id: user._id,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
     res.cookie('token',token,{maxAge:60*60*1000});
     res.status(201).send("admin Registered Successfully");
    


  }
  catch(err){
     res.status(400).send("Error: "+ err);
  }
  }

