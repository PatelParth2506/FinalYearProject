import dotenv from 'dotenv'
import { server } from "./app.js"
import dbconnect from './db/dbconnect.js'

dotenv.config({
    path:"../.env"
})

dbconnect()
.then(async()=>{        
    server.listen(process.env.PORT || 8000,()=>{
        console.log("App Is Running On Port",process.env.PORT)
    })
}).catch((err)=>{
    console.log("Something Went Wrong",err)
})
