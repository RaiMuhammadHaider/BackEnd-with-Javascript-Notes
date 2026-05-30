//this is High order function yani asa function jo k ak or function lata ha as a parameter or usy retun kr deta ha 
const asyncHandler = (requestHandler) => (req , res , next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(
        error => next(error)
    )
}
export {asyncHandler}































// const asyncHandler = (fn) => async(req , res , next ) => {
//     try {
//         await fn(req , res , next )
//     } catch (error) {
//         res.status(error.code || 500 ).json({
//             success : false,
//             message : error.message
//         })
//     }
// } // can be use but first one is best approch