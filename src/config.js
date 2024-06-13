import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const port = process.env.port;

