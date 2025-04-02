import express from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.status(200).json({message: "Served from Node server!!", date: new Date()})
})

app.listen(PORT, () => {
   console.log(`?? http://localhost:${PORT}`)
})
