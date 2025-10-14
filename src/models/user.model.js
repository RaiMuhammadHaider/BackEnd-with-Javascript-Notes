import mongoose , {Schema} from "mongoose";
const userSchema = new Schema({
username : {
    type : String,
    require : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true, // help to find in search

},
email : {
    type : String,
    require : true,
    unique : true,
    lowercase : true,
    trim : true,

},

fullName : {
    type : String,
    require : true,
    trim : true,
    index : true,

},
avatar : {
    type : String,
    required : true,
},

coverImage : {
    type : String,

},
watchHistory : [
    {
        type : Schema.Types.ObjectId,
        ref : "Video"
    }
], 
password : {
    required : [true , "password is required"],
    type : String
},
refreshToken : {
    type : String 
}}, {timestamps : true})
export const User = mongoose.model("User" , userSchema )