import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setChats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    axios,
    createNewChat,
    token,
    setToken,
    setUser,
  } = useAppContext();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen min-w-72 p-5 
    bg-white dark:bg-[#1e1e1e] 
    border-r border-gray-200 dark:border-white/10">

      {/* LOGO */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        className="w-full max-w-48"
      />

      {/* NEW CHAT */}
      <button
        onClick={createNewChat}
        className="mt-8 py-2 text-white rounded-md 
        bg-gradient-to-r from-purple-500 to-blue-500"
      >
        + New Chat
      </button>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search conversations"
        className="mt-4 p-2 border rounded-md bg-transparent"
      />

      {/* CHAT LIST */}
      <div className="flex-1 mt-4 space-y-3 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className="p-3 border rounded-md cursor-pointer flex justify-between"
          >
            <div>
              <p className="text-sm dark:text-white">
                {chat.messages[0]?.content || "New Chat"}
              </p>
              <p className="text-xs text-gray-400">
                {moment(chat.updatedAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* COMMUNITY */}
      <div className="border p-3 rounded-md mt-3">📷 Community Images</div>

      {/* CREDITS */}
      <div className="border p-3 rounded-md mt-3">
        💎 Credits: {user?.credits || 0}
      </div>

      {/* DARK MODE */}
      <div className="border p-3 rounded-md mt-3 flex justify-between">
        🌙 Dark Mode
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        />
      </div>

      {/* USER */}
      <div className="flex items-center gap-3 mt-4 border p-3 rounded-md">
        <img src={assets.user_icon} className="w-7" />
        <p className="flex-1 dark:text-white">{user?.name}</p>
        <img
          onClick={logout}
          src={assets.logout_icon}
          className="h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;