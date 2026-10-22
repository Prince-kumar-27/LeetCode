import jwt from "jsonwebtoken";
import User from "../models/user.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).send("Token missing");
        }

        const user = jwt.verify(token, process.env.JWT_KEY);
        const{_id} = user;

        if (user.role !== "admin") {
            return res.status(403).send("You do not have permission to create admin");
        }
        const result = await User.findById(_id);
        if(!result){
            throw new Error("DATA not found");
        }
        if(!_id){
            throw new Error("can not make admin");
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send(err);
    }
};

export default adminMiddleware;