import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userSchema = new Schema({
username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true, // help to find in search

},
email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,

},

fullName : {
    type : String,
    required : true,
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
userSchema.pre("save"  , async function (next) { //this one is a middleware it says before save kuch kr do . pre mongoose ki terf sy ak middleware ha jo k parameters ma ak action klata ha yani save ka action hm yahan use kr ry hn  us k bad ak function leta ha yani us method pe  kon sa kam ho vo functionlity leta ha
    if (!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password , 10)
    next()
} )
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)

}

// both are jwt token but both use are different
userSchema.methods.generateAccessToken = function () { // these are our custome properties to make changes in schema or sb
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName,
    } ,process.env.ACCESS_TOKEN_SECRET , {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }  )
   
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ // jwt is a bearar token mean jo is ko bear krta ha usi ko ya sahi man leta ha , yani token jis k bi pass ha ma us ko data dy don ga mean , ya k key ki terha ha ak chabi ki terha jis k pass bi vo key chabi ho gi jwt us ko data dy gy ga
        _id : this._id,
    },
process.env.REFRESH_TOKEN_SECRET , {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
   
}
export const User = mongoose.model("User" , userSchema )
// we store refresh_token in db but ve did not save or store the access_token in db
