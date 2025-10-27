import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

// Routes would be added here
import userRouter from './routes/user.routes.js'

// routes decelaration
// app.get pahle likh ke hi  kaam chal jaata thaa but ab nahi chlega because iles seperate hai toh ab middlewre ka use karna hoga

app.use("/api/v1/users",userRouter)

// url banega like this -- http://localhost:8000/api/v1/users/register




export default app;