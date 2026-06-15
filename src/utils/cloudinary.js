// coudinary pe final upload krny k jo production industry methond ha us ma hm multer k through phaly file ko apny local server pe rakhty hn us k bad vo local file hum cloudinary k pe upoad krva lety hn
// ya ka utlity function ha is ma hum local file ko jo k hmary server pe upload ho gi us ko len gy or us ko hm cloundiary pe upload krva den gy
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' // file system ,  it comes by default in node , use to read  write edit etc mean all about file , everything about file in node , no need to install in manually  it comes bydeault in node
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const uploadOnCloudinary = async (localFilePath) => { // local file jo k hmary local server pe upload ho gi
  try {
      if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath , { resource_type : "auto"  // mean kiya ara ha image , video , auto autmatecally detect

     })
    // console.log('file is Uploaded on cloudinary ' ,  response.url ); // log the URL of the uploaded file

    fs.unlinkSync(localFilePath) // delete the locally saved file in case of error , mean agger file successfully upload ho gai ha tu local server pe save file ko remove kr do
    console.log(response)
    return response
   
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the local temporary save file as file upload on cloudinary operation got fail
    console.log('Error while uploading on cloudinary' , error);
    return null
  }
}  

// this is used to upload file on cloudinary


export {uploadOnCloudinary}



