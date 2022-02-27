import dotenv from 'dotenv';
import axios from "axios"
const pg = require("../config/db")()
const HEROKU_URL = process.env.HEROKU_URL
export  class CatController{

    async getAllCatFacts(req:any){
        try {
            const pool = await pg
            let results = await pool.query("SELECT * FROM catstable");
            let data :any= []
            if(!results.rows.length){
                await axios({
                        "method":"get",
                        "url":HEROKU_URL!
                        })
                        .then((res)=>{
                            data =  [...res.data]
                        })
                        data.forEach(async(cat:any)=>{
                            await pool.query("INSERT INTO catstable (text) VALUES($1) RETURNING *",[cat.text])
                        })
            }else{
                results = await pool.query("SELECT * FROM catstable")
                data = results.rows
            }         
            return data
            
        } catch (error) {
            return error      
        }
        
    }
    async addCatFacts(req:any){
        try {
            const {text} = req.body
            const pool = await pg
            const data = await pool.query("INSERT INTO catstable (text) VALUES($1) RETURNING *",[text])
            return data.rows
        
        } catch (error) {
            return error
        }
    }
    async updateCatFacts(req:any){
        try {
            const {text} = req.body
            const {id} = req.params
            const pool = await pg
            const updateCatfact = await pool.query("UPDATE catstable SET text=($1) WHERE id = ($2) RETURNING *",[text, id])
            if(updateCatfact){
                return updateCatfact.rows
            }
            return updateCatfact  
        } catch (error) {
            return error
        }
    }
    async deleteCatFact(req:any){
        try {
            const {id} = req.params
            const pool = await pg
            let status = await pool.query("DELETE FROM catstable WHERE id=($1)",[id])
            return status
            
        } catch (error) {
            return error
        }

    }
}