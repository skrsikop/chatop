import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unSeenMessages,
    setUnSeenMessages
  } = useContext(ChatContext);

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers, onlineUsers]);

  return (
    <div
      className={`bg-[#818582]/10 h-full p-5 rounded-r-xl text-white overflow-y-scroll ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* logo and menu bar */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40 "  />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu icon"
              className="max-h-5 cursor-pointer"
            />
            <div className="bg-[#282142] z-20 w-32 rounded-lg  p-6 text-white hidden group-hover:block absolute top-full right-0">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={logout} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="flex items-center bg-[#282142] py-3 px-4 mt-5 rounded-full gap-2">
        <img src={assets.search_icon} alt="search icon" className="w-3" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none ml-2 border-none text-white text-xs placeholder:[#c8c8c8] flex-1"
        />
      </div>

      {/* user data */}
      <div className="flex flex-col mt-5 ">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnSeenMessages(prev => ({...prev, [user._id]: ""}));
            }}
            key={index}
            className={`relative flex items-center cursor-pointer max-sm:text-sm gap-2 p-2 pl-4 rounded ${
              selectedUser?._id === user._id && "bg-[#282142]/50"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile pic"
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-gray-400 text-xs">Offline</span>
              )}
            </div>
            {unSeenMessages?.[user._id] && (
              <p className="absolute top-4 right-4 flex justify-center items-center rounded-full text-xs h-5 w-5 bg-violet-500/50">
                {unSeenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
