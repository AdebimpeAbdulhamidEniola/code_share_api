import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import apiRoutes from "./routes/apiRoutes.ts"
import errorHandling from "./middleware/errorHandler.ts"
import { Application } from "express"

dotenv.config()

const app :Application = express()

const port = process.env.SERVER_PORT || 3001



//Middlewares 
app.use(express.json())
app.use(cors())


//Routes
app.use("/api/snippets", apiRoutes)



//Error handling middleware 
app.use(errorHandling)

//Server running

app.listen(port , () => {
    console.log(`Server is running at http://localhost:${port}`)
})

