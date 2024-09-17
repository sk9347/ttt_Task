const express=require('express')
const dbConnection = require('./config/db')
const cors=require('cors')
const router = require('./Routes/userRoutes')
const dotenv=require('dotenv')
const app=express()

dotenv.config();

app.use(express.json())

dbConnection()

app.use(cors())

app.use('/',router)

app.listen(3001,()=>{
    console.log('server started on 3001')
})