import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOADINARY_NAME,
  api_key: process.env.CLOADINARY_API_KEY,
  api_secret: process.env.CLOADINARY_API_SECRET,
});

export default cloudinary;