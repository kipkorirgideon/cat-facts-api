"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const catsController_1 = require("../controllers/catsController");
module.exports = (app) => __awaiter(void 0, void 0, void 0, function* () {
    let baseRoute = '/cats';
    const catscontroller = new catsController_1.CatController();
    app.get(`${baseRoute}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cats = yield catscontroller.getAllCatFacts(req);
        if (cats)
            return res.status(200).json(cats);
        return res.status(404).json({ message: 'Invalid request' });
    })),
        app.post(`${baseRoute}/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        })),
        app.put(`${baseRoute}/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield catscontroller.updateCatFacts(req);
            if (data)
                return res.status(200).json(data);
            return res.status(404).json({ message: 'Invalid request' });
        })),
        app.delete(`${baseRoute}/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield catscontroller.deleteCatFact(req);
            if (data)
                return res.status(200).json(data);
            return res.status(404).json({ message: 'Invalid request' });
        }));
});
