import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const fileuploder=async(path)=>{
    try {
        if(!path) return null
        const response=await cloudinary.uploader.upload(path,{
            resource_type:"auto"
        })
        console.log(response)
        // fs.unlinkSync(path)
        return response
    } catch (error) {
        fs.unlinkSync(path)
        console.log(error)
    }
}

export { fileuploder }