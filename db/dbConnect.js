import mysql from 'mysql2'
import { configDotenv } from "dotenv";
configDotenv(); // Load environment variables from .env file

//connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    port: import.meta.PORT || 4000
})

export default connection;