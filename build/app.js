"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//setting app the middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// getting routes
require("./routes/routes")(app);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
