import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const Home = () => {
  const {selectedUser} = useContext(ChatContext)


  return (
    <div className=" w-full h-screen sm:px-[0%] sm:py-[1%] ">
      <div className={`backdrop-blur-xl overflow-hidden h-[100%] rounded-2xl  grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "grid-cols-2"}`}>
        <Sidebar />
        <ChatContainer  />
        <RightSidebar  />
      </div>
    </div>
  );
};

export default Home;
