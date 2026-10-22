import express from express
const problemRoute = express.Router();
import adminMiddleware from "../middleware/userMiddleware";

//problem create and need admin access
 problemRoute.post("/create",adminMiddleware,CreateProblem);
 problemRoute.patch("/:id",adminMiddleware,UpdateProblem);
 problemRoute.delete("/:id",adminMiddleware,DeleteProblem);
//problem fetch
problemRoute.get("/:id",problemFetch);
//fetch all problem
problemRoute.get("/",getAllProblem);
//solved proble

problemRoute.get("/user",solvedProblem);