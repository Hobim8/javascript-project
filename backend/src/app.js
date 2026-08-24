import express from "express";
import userRouter from './routes/user.route.js';

//create an express app
const app = express();


// routes declaration
app.use("/api/v1/users", userRouter);

export default app;





