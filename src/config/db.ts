import { Application } from "express";
import pg, { Pool } from "pg"

//connectinng to the database

module.exports = async()=>{
    new Pool({
        user:"postgres",
        password:"postgres",
        host:"localhost",
        port:5432,
        database:"catsdb"
    })
}