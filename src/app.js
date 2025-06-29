import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express();

app.use(cors({credentials:true}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// import Routes 
import userRouter from "./routes/user.route.js";


// declaring Routes 
app.use('/api/user' , userRouter)
export {app};