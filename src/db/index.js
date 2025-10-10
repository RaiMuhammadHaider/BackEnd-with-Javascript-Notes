import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js' // our database name 

const connectDB = async () => {
    try {
        const connectionHost = await mongoose.connect(`${process.env.MONGODB_UEL}/${DB_NAME}`) //mongoDB Url + Our data base name 
        console.log(`MongoDB Connected : Host on ${connectionHost.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Connection Error : ${error} `);
        process.exit(1)
        
    }
}
export default connectDB