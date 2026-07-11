import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { ApiError } from './ApiError.js'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log("File successfully uploaded on cloudinary....");
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath)
        return null
    }
    finally{
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
    }
}

const deleteFromCloudinary = async (oldPhotoLink) => {
    try {
        if(!oldPhotoLink){
            throw new ApiError(400, "Provide the photo link")
        }
        const publicId = oldPhotoLink.split('/').pop().split('.')[0]
        if(!publicId){
            throw new ApiError(400, 'something went wrong !!')
        }

        const response = await cloudinary.uploader.destroy(publicId)
        console.log('Older file deleted successfully from Cloudinary');
        return response
    } catch (error) {
        console.log(error);
        return null
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}