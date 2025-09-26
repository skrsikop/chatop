import jwt from "jsonwebtoken";

// generate funtion for user token 
export const generateToken = (userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET)
  return token
}