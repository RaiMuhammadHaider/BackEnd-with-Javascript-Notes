import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js' // our database name 

const connectDB = async () => {
    try {
        const connectionHost = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) //mongoDB Url + Our data base name 
        console.log(`MongoDB Connected : Host on ${connectionHost.connection.host}`)
        // console.log("checxccdcdcdking ", connectionHost)
        console.log(process.env.MONGODB_URL)
        console.log("DB Name:", connectionHost.connection.name);
console.log("Host:", connectionHost.connection.host);
    } catch (error) {
        console.log(`MongoDB Connection Error : ${error} `);
                console.log("haider error",process.env.MONGODB_URL)

        process.exit(1)
        
    }
}
export default connectDB