import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"


const generateAccessAndRefreshToken = async (user_id) => {
    try {
        const user = await User.findById(user_id)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('something went wrong while generating access and refresh token');
    }
}

export const registerUser = async (req, res) => {
    const { fullName, email, password, contactNo, gender, dateOfBirth } = req.body
    if ([fullName, email, password, contactNo, gender].some((item) => !item?.trim())) {
        throw new ApiError(400, 'fill all required items')
    }

    if ((contactNo.length !== 10)) {
        throw new ApiError(400, 'Enter correct phone No')
    }

    if (password.length < 8) {
        throw new ApiError(400, 'Password must be atleast 8 characters')
    }

    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, 'email already existed !!')
    }

    let photoLocalPath
    if (req.file) {
        photoLocalPath = req.file.path
    }

    const photo = await uploadOnCloudinary(photoLocalPath)

    const user = await User.create({
        fullName: fullName,
        email: email.toLowerCase(),
        password: password,
        photo: photo?.secure_url || "",
        gender: gender,
        contactNo: contactNo,
        dateOfBirth: dateOfBirth || undefined,
    })

    if (!user) {
        throw new ApiError(400, 'user creation failed !!')
    }

    const createdUser = await User.findById(user._id).select(
        "-password -contactNo -refreshToken"
    )
    console.log('user registered successfully...');

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User register successfully...")
    )
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, 'all field required')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, 'User does not exist !!')
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, 'password incorrect')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    console.log('User loggedIn successfully...');
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, 'User loggedIn successfully...')
        )

}

export const logoutUser = async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, 'Unauthorized request')
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    if (!updatedUser) {
        throw new ApiError(404, "User not found")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    console.log('User loggedOut successfully...');

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, null, "User loggedOut successfully...")
        )
}

export const updateDetails = async (req, res) => {
    const { fullName, email, contactNo, dateOfBirth, gender } = req.body
    //if nothing wrote in the form then no need to update
    if (!fullName && !email && !contactNo && !dateOfBirth && !gender) {
        throw new ApiError(400, "No fields provided for update")
    }

    const user = req.user
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const updatedDetails = {}
    if (fullName?.trim()) updatedDetails.fullName = fullName.trim()
    if ((email?.trim()) && (user.email !== email?.trim().toLowerCase())) updatedDetails.email = email.trim().toLowerCase()
    if ((contactNo?.trim()) && (contactNo?.trim().length === 10 || contactNo?.trim().length === 12)) updatedDetails.contactNo = contactNo.trim()
    if (dateOfBirth) updatedDetails.dateOfBirth = dateOfBirth
    if (gender?.trim()) updatedDetails.gender = gender.trim()

    const userUpdate = await User.findByIdAndUpdate(
        user._id,
        {
            $set: updatedDetails
        },
        {
            new: true
        }
    ).select("-password -refreshToken")
    if (!userUpdate) {
        throw new ApiError(404, "User not found")
    }

    console.log('User updated successfully...');
    
    return res.status(200).json(
        new ApiResponse(200, userUpdate, "Update info successfully...")
    )

}

export const updatePhoto = async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(401, "Unauthorized request")
    }

    const old_photo_url = user.photo

    const photoLocalPath = req.file?.path
    if (!photoLocalPath) {
        throw new ApiError(400, 'photo must required')
    }

    const photo = await uploadOnCloudinary(photoLocalPath)
    if (!photo?.secure_url) {
        throw new ApiError(500, 'New File uploaded on cloudinary failed !!')
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                photo: photo?.secure_url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!updatedUser) {
        throw new ApiError(404, "User not found")
    }


    let delete_response
    if (old_photo_url) {
        delete_response = await deleteFromCloudinary(old_photo_url)
    }

    return res.status(200).json(
        new ApiResponse(200, {
            updatedUser,
        },
            "profile photo updated successfully...")
    )
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, 'all fields required')
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password")
    }

    if (newPassword.length < 8) {
        throw new ApiError(400, 'Password must be at least 8 characters long')
    }

    const user = req.user
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, 'please enter correct password')
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })


    return res.status(200)
        .json(
            new ApiResponse(200, null, 'password changed successfully...')
        )

}

export const deleteUser = async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }


    const deletedUser = await User.findByIdAndDelete(user?._id)
    if (!deletedUser) {
        throw new ApiError(404, 'User not found')
    }

    if (user.photo?.secure_url) {
        await deleteFromCloudinary(user.photo.secure_url)
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User deleted successfully..."))
}
