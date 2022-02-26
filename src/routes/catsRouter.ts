import { Application, Response, Request } from "express";
import {CatController} from "../controllers/catsController"
module.exports = async(app:Application)=>{
    let baseRoute = '/cats'
    const catscontroller = new CatController()
    app.get(`${baseRoute}`, async(req:Request, res:Response)=>{
        const cats = await catscontroller.getAllCatFacts(req)
        if(cats) return res.status(200).json(cats)
        return res.status(404).json({message:'Invalid request'})
    }),
    app.post(`${baseRoute}/:id`, async(req:Request, res:Response)=>{

    }),
    app.put(`${baseRoute}/:id`, async(req:Request, res:Response)=>{
        const data = await catscontroller.updateCatFacts(req)
        if(data) return res.status(200).json(data)
        return res.status(404).json({message:'Invalid request'})

    }),
    app.delete(`${baseRoute}/:id`,async(req:Request, res:Response)=>{
        const data = await catscontroller.deleteCatFact(req)
        if(data) return res.status(200).json(data)
        return res.status(404).json({message:'Invalid request'})
    })
}