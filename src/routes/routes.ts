import { Application } from 'express';
export namespace genRouter {
    module.exports = async(app:Application)=>{
        require('./catsRouter')(app)
    }
}