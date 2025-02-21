import dotenv from 'dotenv'
import { app } from "./app.js"
import dbconnect from './db/dbconnect.js'

dotenv.config({
    path:"../.env"
})


dbconnect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("App Is Running On POrt",process.env.PORT)
    })
}).catch((err)=>{
    console.log("Something Went Wrong",err)
})

