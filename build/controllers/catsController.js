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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const pool = require("../config/db");
const CatFact = mongoose_1.default.model("catsFactsInfo");
dotenv_1.default.config();
const HEROKU_URL = process.env.HEROKU_URL;
class CatController {
    getAllCatFacts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingData = yield CatFact.find({});
                let catsfacts;
                let data = [];
                if (!existingData.length) {
                    yield (0, axios_1.default)({
                        "method": "get",
                        "url": HEROKU_URL
                    })
                        .then((res) => {
                        data = [...res.data];
                    });
                    data.forEach((cat) => __awaiter(this, void 0, void 0, function* () {
                        catsfacts = new CatFact();
                        catsfacts.text = cat.text;
                        yield catsfacts.save();
                    }));
                    console.log("ADDED DATA");
                }
                else {
                    data = yield CatFact.find({});
                    const cats = pool.query("SELECT * FROM catstesttable");
                    console.log("NORMAL DATA FETCHING");
                    console.log(cats);
                }
                return data;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateCatFacts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                let existingfact = yield CatFact.findOneAndUpdate({ _id: req.params.id }, { text: req.body.text });
                return existingfact;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteCatFact(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status = yield CatFact.findOneAndDelete({ _id: req.params.id });
                console.log({ deleted: true });
                return status;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.CatController = CatController;
