import React, {  useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const {selectedUser, messages } = useContext(ChatContext)
  const {logout,onlineUsers } = useContext(AuthContext)
  const [mesgImages, setMesgImages] = useState([])

  // get all images from the messages 
  useEffect(() => {
    setMesgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className={`bg-[#8185b2]/10 text-white  w-full relative overflow-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="avatr" className="w-20 aspect-[1/1] rounded-full" />
        <h1 className="px-10 text-xl font-medium gap-2 flex  mx-auto items-center">
          {onlineUsers.includes(selectedUser._id) &&<p className="w-2 h-2 rounded-full bg-green-500"/> }
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      <div className="px-5 text-xs ">
        <p>Media</p>
        <div className="mt-2 max-h-[250px] overflow-scroll grid grid-cols-2 gap-4 opacity-80">
          {mesgImages.map((image, index) => (
            <div key={index} onClick={() => window.open(image)} className="cursor-pointer rounded-lg">
              <img src={image} alt="image" className="h-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => logout()} className=" absolute bottom-5  left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-sm font-light py-2 px-20 rounded-full text-white  border-none cursor-pointer">
        Logout
      </button>
    </div>
  )
};

export default RightSidebar;
