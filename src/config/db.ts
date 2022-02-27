import { Application } from "express";
import pg, { Pool } from "pg"

//connectinng to the database

module.exports = async()=>{
    let pool = new Pool({
        user:"postgres",
        password:"postgres",
        host:"localhost",
        port:5432,
        database:"catfactsdb"
    })
    return pool   
}