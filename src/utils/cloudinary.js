import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath , { resource_type : "auto" 

     })
    // console.log('file is Uploaded on cloudinary ' ,  response.url ); // log the URL of the uploaded file

    fs.unlinkSync(localFilePath) // delete the locally saved file in case of error
    return response
    
  } catch (error) {
    console.log('Error while uploading on cloudinary' , error);
    return null
  }
}

// this is used to upload file on cloudinary


export {uploadOnCloudinary}


