import express from "express";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);




//path example: http://localhost:8000/api/users/register
export default app;





