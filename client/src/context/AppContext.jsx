import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(true);

  const authHeader = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  /* FETCH USER */
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data", authHeader);
      if (data.success) setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  /* FETCH CHATS */
  const fetchUsersChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/user", authHeader);
      if (data.success) {
        setChats(data.chats);
        if (data.chats.length > 0) {
          setSelectedChat(data.chats[0]);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* CREATE CHAT */
  const createNewChat = async () => {
    try {
      if (!user) return toast.error("Login first");

      const { data } = await axios.post("/api/chat/create", {}, authHeader);

      if (data.success) {
        setChats((prev) => [data.chat, ...prev]);
        setSelectedChat(data.chat);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* 🔥 FIXED DARK MODE */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* LOAD USER */
  useEffect(() => {
    if (token) fetchUser();
    else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  /* LOAD CHATS */
  useEffect(() => {
    if (user) fetchUsersChats();
    else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        createNewChat,
        loadingUser,
        fetchUsersChats,
        token,
        setToken,
        axios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);