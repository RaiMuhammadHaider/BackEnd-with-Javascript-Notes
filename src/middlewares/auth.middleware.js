import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
export const verifyJwt = asyncHandler(async(req , _ , next)=>{ // industry practice to use a _ when we are not using the req , res 
try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
    if ( !token) {
        throw new apiError(401 , "Unauthorized request")
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    if (!user) {
        throw new apiError(401 , "Invalid Acess Token ")
      
    }
      req.user = user
        next()
} catch (error) {
    throw new apiError(401 , error?.message || "Invalid accesstoken")
}
})
// and this one is the auth middle ware the user can only get access when it is authenticated for example a user can logged out then he is login so it must bi authenticated before logout 