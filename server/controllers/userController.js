import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register a new user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    // Check if all required fields are provided
    if (!fullName || !email || !password || !bio) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists"
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio
    });

    // Generate authentication token
    const token = generateToken(newUser._id);

    // Send response with user data and token
    res.json({
      success: true,
      message: "User Created Successfully",
      userData: newUser,
      token
    });
  } catch (error) {
    // Handle errors
    res.json({
      success: false,
      message: error.message
    });
    console.log(error.message);
  }
};

// Login a user 
export const login = async (req,res) => {
  try {
    const {  email, password } = req.body;
    const userData =  await User.findOne({email});

    // Check if password are correct
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Incorrect Password"
      });
    }

    // Generate authentication token
    const token = generateToken(userData._id);

    // Send response with user data and token
    res.json({
      success: true,
      message: "User Logged In Successfully",
      userData,
      token
    })
  } catch (error) {
    // Handle errors
    res.json({
      success: false,
      message: error.message
    });
    console.log(error.message);
  }
}

// Check if user is Authenticated 
export const checkAuth = (req,res) => {
  res.json({
    success: true,
    user: req.user
  })
}

// Update user profile details
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(400).json({ success: false, message: "User ID not found in request" });

    const { fullName, bio, profilePic } = req.body;
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (bio) updateData.bio = bio;

    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic, { folder: "profile_pics", resource_type: "auto" });
      updateData.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true });

    res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
