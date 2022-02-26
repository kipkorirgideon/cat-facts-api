import dotenv from 'dotenv';
import axios from "axios"
const pool = require("../config/db")()
const HEROKU_URL = process.env.HEROKU_URL
export  class CatController{

    async getAllCatFacts(req:any){
        try {
            const data = await pool
            const results = await data.query("SELECT * FROM catstesttable");
           
            return results.rows
            
        } catch (error) {
            return error      
        }
        
    }
    async updateCatFacts(req:any){
        try {
           
            
        } catch (error) {
            return error
        }
    }
    async deleteCatFact(req:any){
        try {
            
        } catch (error) {
            return error
        }

    }
}