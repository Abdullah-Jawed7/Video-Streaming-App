import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse}  from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req , res) => {
    // Steps :
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

    // Another way to validate all fields are having data :
    if ([fullName , email , userName , password].some((field)=> field?.trim() === "")) {
        //  ".some" : return true if any element of an array fulfilled the provided condition 
           throw new ApiError(400 , "All fields are required")
    }
// Todo: write validations such as email contain @ , password contain min 8 character , 

// checking is username or email taken
const isUserExisted  = User.findOne({
    $or:[{ userName } , { email }]
})

if (isUserExisted) {
    throw new ApiError(409 , "User with email and username already exists")
}

// files coming from multer middleware 
const avatarLocalPath = req.files?.avatar[0]?.path
const imageLocalPath = req.files?.coverImage[0]?.path

if (!avatarLocalPath) {
    throw new ApiError(400 , "Avatar is required") 
}

const avatar  = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(imageLocalPath)

if (!avatar) {
    throw new ApiError(400 , "Avatar is required") 
}

// create user
const user = await User.create({
    fullName , 
    avatar: avatar.url,
    coverImage: coverImage?.url || "" ,
    userName:userName.tolowerCase() ,
    email , 
    password,

})

// check is user created successfully
const isUserCreated = await User.findById(user._id).select("-password -refreshToken")

if (!isUserCreated) {
    throw new ApiError(500 ,"Something went wrong while registering user")
}

// sending response to frontend

return res.status(201).json( 
    new ApiResponse(201 ,isUserCreated ,"User registered successfully!" )
)


})

export {registerUser}