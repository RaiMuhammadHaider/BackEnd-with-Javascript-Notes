import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp') // specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({  storage }) // file ka size kiya ho ga file ki type kiya ho gi vo sab multer ma hi define kiya jata
// this middleware saves the file to local temp folder before uploading to cloudinary
/*
process kuch is terha sy jota ha k sab sy phaly user file upload krta ha
user upload file ==> multern ==> save the file into local storage or punlic/temp ==> upload on cloudinary ==> get cloudinary url ==> save Url in db ==> Delete temp folder into local storage ot public/temp

*/
