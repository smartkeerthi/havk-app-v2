import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import router from './Routes/index.js'

// Load Config
dotenv.config({path: './config/config.env'})

connectDb()

// App Initialize
const app = express()

const PORT = process.env.PORT || 5000

//Routes
app.use(express.json())
app.use(cors())
app.use('/api', router)


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))