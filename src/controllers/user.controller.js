import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOncloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res) => {
    // Registration logic here
   // get user details from fronted
   // validation lagana parega -- not empty
   // check if user alredy exist. -- username or email
   // check for images ,check for avtar
   // upload them to clodinary, avatar
   // create user object -- create entry in db
   // remove password and refresh token from field from response
   // check for user creation
   // return response
   
   const {fullName,email,username,password}=req.body // agar form se data aa rha ho to req.body se kaam ho jaayega
   console.log("email",email);

   if(
    [fullName,email,username,password].some((field)=>field?.trim()==="")
   )
    {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser=User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User with emial or username alredy exist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }


    const avatar=await uploadOncloudinary(avatarLocalPath)

    const coverImage = await uploadOncloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required" )
    }

    const user =await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowercase()
    })


    const createdUser =await User.findById(user._id).select(
        "-password -refreshToken" // joo nahi chaiye uske aage - lagate hai aur space laga ke next likhte hai
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User register successfully")
    )
})



export { registerUser, };