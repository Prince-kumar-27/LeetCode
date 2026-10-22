
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const adminMiddleware = async (req, res, next) => {
    try {
        // 1. Extract the token from the cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        // 2. Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // 3. Check the user ID
        if (!decoded._id) {
            return res.status(401).json({
                message: "User ID missing from token"
            });
        }

        // 4. Fetch the actual user from MongoDB
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // 5. Check the current database role
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        // 6. Attach the verified database user
        req.user = user;

        next();
    } catch (err) {
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        next(err);
    }
};

export default adminMiddleware;

