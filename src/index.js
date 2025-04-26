import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

const port = process.env.PORT || 8000
dotenv.config()
connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("Error: " , err);
        throw err
        
    })
    app.listen(port , ()=>{
        console.log("server is running on a port " , port);
        
    })
})
.catch((error)=> { 
    console.log("DB Connection Failed !! ", error)}
)