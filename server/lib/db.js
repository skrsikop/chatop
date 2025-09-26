import mongoose from  "mongoose";

export const connectDB = async () => {
  try {

    mongoose.connection.on('connected', () => {
      console.log("Mongodb Connected")
    })    
    await mongoose.connect(`${process.env.MONGODB_URL}/chatop`)
  } catch (error) {
    console.log(error)
  }
}