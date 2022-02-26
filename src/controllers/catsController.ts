import dotenv from 'dotenv';
import axios from "axios"
import mongoose from "mongoose"
import { ICatFact } from '../models/catSchema';
const pool = require("../config/db")
const CatFact = mongoose.model<ICatFact>("catsFactsInfo")
dotenv.config()
const HEROKU_URL = process.env.HEROKU_URL
export  class CatController{

    async getAllCatFacts(req:any){
        try {
            const existingData = await CatFact.find({})
            let catsfacts;
            let data :any= []
            if(!existingData.length){
                await axios({
                    "method":"get",
                    "url":HEROKU_URL!
                })
                .then((res)=>{
                data =  [...res.data]
                })
                data.forEach(async(cat:any)=>{
                    catsfacts = new CatFact()
                    catsfacts.text = cat.text
                    await catsfacts.save()
                })
                console.log("ADDED DATA")

            }else{
                data = await CatFact.find({})
                
                const cats =  await pool.query("SELECT * FROM catstesttable")
                console.log("NORMAL DATA FETCHING")
                console.log(cats)



            }
            return data
            
        } catch (error) {
            return error      
        }
        
    }
    async updateCatFacts(req:any){
        try {
            console.log(req)
            let existingfact = await CatFact.findOneAndUpdate(
                {_id:req.params.id},
                {text:req.body.text}
            )
            return existingfact
            
        } catch (error) {
            return error
        }
    }
    async deleteCatFact(req:any){
        try {
            let status = await CatFact.findOneAndDelete({_id:req.params.id})
            console.log({deleted:true})
            return status
        } catch (error) {
            return error
        }

    }
}