import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.CORS_ORIGIN
}))
app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    limit : "16kb",
    extended : true
}))
app.use(express.static("static"))
app.use(cookieParser())
export {app}