import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path : './.env' // config dotenv
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 9000 , ()=>{
        console.log(`Port is listening at ${process.env.PORT}`);
        
    })
    app.on('error' , (error)=>{
        console.log(`Error Found ! : ${error} `);
        
    })
    
}).catch((error)=>{
    console.log(`MongoDB Connection Failed !!  ${error}`);
    
}) // connect MongoDB