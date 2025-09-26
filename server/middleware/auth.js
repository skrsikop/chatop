import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to authenticate and authorize users using JWT.
 * - Verifies JWT token from request headers.
 * - Fetches user from database (excluding password).
 * - Attaches user object to request for downstream handlers.
 * - Handles errors and unauthorized access.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve token from request headers
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user by ID, exclude password field
    const user = await User.findById(decoded.userId).select("-password").lean();

    // If user not found, respond with error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Attach user to request object for downstream use
    req.user = user;
    next();
  } catch (error) {
    // Handle invalid token or other errors
    res.status(401).json({
      success: false,
      message: error.name === "JsonWebTokenError" ? "Invalid token." : error.message
    });
  }
};