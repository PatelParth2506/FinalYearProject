import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbconnect= async()=>{
   try {
        const connection=await mongoose.connect(process.env.MONGODB_URL)
        console.log("Successfully Connected To MongoDB")
   } catch (error) {
        console.log("Cant Connect To MongoDb",error)
        process.exit(1)
   }
}

export default dbconnect;