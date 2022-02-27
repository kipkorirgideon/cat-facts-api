import { Pool } from "pg"
import dotenv from 'dotenv';
dotenv.config()
//connectinng to the database

module.exports = async()=>{
    let pool = new Pool({
        user:process.env.user,
        password:process.env.password,
        host:process.env.host,
        //@ts-ignore
        port:process.env.port,
        database:process.env.database
    })
    console.log(`Connectd to postgres at http://${process.env.host}:${process.env.port}`);
    return pool   
}