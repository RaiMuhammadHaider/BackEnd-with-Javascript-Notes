import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {apiResponse} from '../utils/apiResponse.js'
const userRegisterController = asyncHandler(async (req  , res ) => {

    const {username , email , fullName , password } = req.body
    if ([username , email , fullName , password].some( (field) => field.trim() === "" )  ) {
        throw new apiError(400 , "All fields are required ")
    }
    const userExist = await User.findOne({$or : [ {email} , {username}]}) // check user already exists
    if (userExist) {
        throw new apiError(409 , "User with same Email , or Username ALready exist")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new apiError(400 , "avatar is required" )
    }
        const avatar =  await  uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!avatar) {
            throw new apiError(400 , "avatar is required")
        }

     const user = await User.create({ // create user entry in db
            email,
            password,
            username: username.toLowerCase(),
            fullName,
            avatar : avatar.url,
            coverImage : coverImage.url || "",
        })
        const createUser =    User.findById(user._id).select( // remove password and refreshToken from response
            "-password -refreshToken"
        )
        if (!createUser) { 
            throw new apiError(500 , "Something went wrong while register the user Internal Server " )
            
        }
        return res.status(201).json(
            new apiResponse(200 , createUser , "user register successfully" )
        )
    

 
})

export {userRegisterController}





















 // get data form frontend
 // validate - not empty
 // check user if already exists (check by email , username)
 // check for image , check for avatar
 // upload it into cloudniary  , avatar
 // create user object - create entry in db
 // remove password and refresh token from field from response
 // check for user creation
 // return response
   