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
const axios_1 = __importDefault(require("axios"));
const pg = require("../config/db")();
const HEROKU_URL = process.env.HEROKU_URL;
class CatController {
    getAllCatFacts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield pg;
                let results = yield pool.query("SELECT * FROM catstable");
                let data = [];
                if (!results.rows.length) {
                    yield (0, axios_1.default)({
                        "method": "get",
                        "url": HEROKU_URL
                    })
                        .then((res) => {
                        data = [...res.data];
                    });
                    data.forEach((cat) => __awaiter(this, void 0, void 0, function* () {
                        yield pool.query("INSERT INTO catstable (text) VALUES($1) RETURNING *", [cat.text]);
                    }));
                }
                else {
                    results = yield pool.query("SELECT * FROM catstable");
                    data = results.rows;
                }
                return data;
            }
            catch (error) {
                return error;
            }
        });
    }
    addCatFacts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.body;
                const pool = yield pg;
                const data = yield pool.query("INSERT INTO catstable (text) VALUES($1) RETURNING *", [text]);
                return data.rows;
            }
            catch (error) {
                return error;
            }
        });
    }
    updateCatFacts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.body;
                const { id } = req.params;
                const pool = yield pg;
                const updateCatfact = yield pool.query("UPDATE catstable SET text=($1) WHERE id = ($2) RETURNING *", [text, id]);
                if (updateCatfact) {
                    return updateCatfact.rows;
                }
                return updateCatfact;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteCatFact(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pool = yield pg;
                let status = yield pool.query("DELETE FROM catstable WHERE id=($1)", [id]);
                return status;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.CatController = CatController;
