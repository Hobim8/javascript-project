import express from "express";
import userRouter from './routes/user.routes.js';
//import postRouter from './routes/post.routes.js';

//create an express app
const app = express();
app.use(express.json());

// routes declaration
app.use("/api/users", userRouter);
//app.use("/api/v1/posts", postRouter);


//path example: http://localhost:8000/api/users/register
export default app;





