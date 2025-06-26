import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"

const registerUser = asyncHandler( async (req , res) => {
    // get user details from frontend
    // validation  -- notempty , email validation ,
    // check if user already not exist via email , username
    // check for images , avatar 
    // upload them to cloudinary 
    // create user object ,
    // check for user creation 
    // only send necessary filed to frontend 

    const {fullName , email , userName , password} = req.body
    console.log(req.body)

    // if (!fullName || !email || !userName || !password ) {
    //     throw new ApiError(400 , "All fields are required")
    // }

    // Anoyher way to validate :
    if ([fullName , email , userName , password].some((field)=> field?.trim() === "")) {
           throw new ApiError(400 , "All fields are required")
    }

})

export {registerUser}