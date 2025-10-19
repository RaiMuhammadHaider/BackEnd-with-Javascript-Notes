import { asyncHandler } from "../utils/asyncHandler.js";
const userController = asyncHandler(async (req  , res ) => {
    res.status(200).json({
        name : "Rai Muhammad Haider"
    })
})

export {userController}