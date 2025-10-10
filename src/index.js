import connectDB from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({
    path : './env' // config dotenv
})
connectDB() // connect MongoDB