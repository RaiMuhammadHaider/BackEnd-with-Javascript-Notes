import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp') // specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
})

export const upload = multer({  storage })
// this middleware saves the file to local temp folder before uploading to cloudinary 