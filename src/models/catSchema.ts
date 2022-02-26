import mongoose, {Document} from "mongoose"

export interface ICatFact extends Document{
    text:string
}

const catFactSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model<ICatFact>('catsFactsInfo', catFactSchema)