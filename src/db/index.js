import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js' // our database name 

const connectDB = async () => {
    try {
        let connectionUrl = process.env.MONGODB_URL;
        if (connectionUrl.includes('?')) {
            const parts = connectionUrl.split('?');
            const baseUrl = parts[0].endsWith('/') ? parts[0] : `${parts[0]}/`;
            connectionUrl = `${baseUrl}${DB_NAME}?${parts[1]}`;
        } else {
            const baseUrl = connectionUrl.endsWith('/') ? connectionUrl : `${connectionUrl}/`;
            connectionUrl = `${baseUrl}${DB_NAME}`;
        }

        const connectionHost = await mongoose.connect(connectionUrl) //mongoDB Url + Our data base name 
        console.log(`MongoDB Connected : Host on ${connectionHost.connection.host}`)
        // console.log("checxccdcdcdking ", connectionHost)
        console.log("Connection URL:", connectionUrl)
        console.log("DB Name:", connectionHost.connection.name);
        console.log("Host:", connectionHost.connection.host);
    } catch (error) {
        console.log(`MongoDB Connection Error : ${error} `);
        console.log("haider error", process.env.MONGODB_URL)

        process.exit(1)
        
    }
}
export default connectDB