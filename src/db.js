import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function connectToDb(){
    try {
        const db = await mongoose.connect(MONGODB_URI);
        console.log('connection is successfully');
    } catch (error) {
        console.log(error);
    }
}