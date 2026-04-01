import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const ChatBox = () => {
  const containerRef = useRef(null);

  const { selectedChat, theme, user, axios, token, setUser } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  /* ---------------- SEND MESSAGE ---------------- */
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("Login to send message");
    if (!selectedChat) return toast.error("Select a chat first");
    if (!prompt.trim()) return;

    const promptCopy = prompt;
    setPrompt("");
    setLoading(true);

    // show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: promptCopy,
        timestamp: Date.now(),
        isImage: false,
      },
    ]);

    try {
      const { data } = await axios.post(
        `/api/message/${mode}`,
        {
          chatId: selectedChat._id,
          prompt: promptCopy,
          isPublished,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.reply]);

        // update credits locally
        setUser((prev) => ({
          ...prev,
          credits: Math.max(
            0,
            prev.credits - (mode === "image" ? 2 : 1)
          ),
        }));

        if (mode === "image") {
          setIsPublished(false);
        }
      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setPrompt(promptCopy);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOAD CHAT MESSAGES ---------------- */
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 max-md:mt-14">
      
      {/* CHAT AREA */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              className="w-full max-w-56"
              alt="logo"
            />
            <p className="mt-5 text-4xl text-gray-400">
              Ask me anything
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {loading && (
          <div className="flex gap-1 mt-2">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
          </div>
        )}
      </div>

      {/* IMAGE PUBLISH OPTION */}
      {mode === "image" && (
        <label className="flex items-center gap-2 text-xs mx-auto mb-3">
          Publish to Community
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* INPUT BOX */}
      <form
        onSubmit={onSubmit}
        className="rounded-full p-3 flex gap-4 border border-gray-300 dark:border-white/20"
      >
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-transparent outline-none"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {/* ✅ FIXED INPUT */}
        <input
          id="prompt"
          name="prompt"
          autoComplete="off"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent outline-none"
        />

        <button disabled={loading || !selectedChat}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-8"
            alt="send"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;