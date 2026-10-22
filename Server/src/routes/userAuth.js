import {Router} from "express"

const authrouter = Router();
import {register,login,logout,adminRegister} from "../controllers/userAuthenticate.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

//Register
  authrouter.post('/register',register);
//loging
authrouter.post('/login',login);
// logout
authrouter.post('/logout',userMiddleware, logout);
//adminRegister
authrouter.post('/admin/register',adminMiddleware,adminRegister);

export default authrouter;

