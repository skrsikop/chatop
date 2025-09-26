import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// Get all users except the logged in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    // hel users oo aanan ahayn aniga
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

    // count unseen messages per user
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        recieverId: userId,
        seen: false
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    res.json({
      success: true,
      users: filteredUsers,
      unseenMessages
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    // labadaba dhinac ka hel
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: selectedUserId },
        { senderId: selectedUserId, recieverId: myId }
      ]
    }).sort({ createdAt: 1 });

    // mark unseen as seen (messages uu iigu soo diray isaga)
    await Message.updateMany(
      { senderId: selectedUserId, recieverId: myId, seen: false },
      { $set: { seen: true } }
    );

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Api to mark a single message as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// send message to selected user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      text,
      image: imageUrl,
      senderId,
      recieverId
    });

    // emit the new message to the reciever if online
    const recieverSocketId = userSocketMap[recieverId];
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    // also emit back to sender (so sender updates without waiting reload)
    const senderSocketId = userSocketMap[senderId];
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.json({
      success: true,
      newMessage
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};
