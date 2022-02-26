import { Application } from "express";
import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env.DATABASE

module.exports = async(app:Application)=>{
    require("../models/catSchema")
    mongoose.connect(uri!)
    const con = mongoose.connection
    con.on("open",()=>{
        console.log('Database is connected...')
    })
    con.on("disconnected",()=>{
        console.log('Fail to connect to the database...')
    })
}