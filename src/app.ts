import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express()

//setting app the middleware
app.use(express.json())
app.use(cors())
require("./config/db")()

// getting routes
require("./routes/routes")(app)


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})