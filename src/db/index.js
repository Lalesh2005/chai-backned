import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB connected DB Host:${connectionInstance.connection.host} !!!`);

    }
    catch{
        console.error("Connection failed");
        process.exit(1);
    }
}

export default connectDB;