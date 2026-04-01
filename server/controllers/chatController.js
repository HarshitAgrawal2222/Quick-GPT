import Chat from "../models/Chat.js";

/* CREATE NEW CHAT */
export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      userName: req.user.name,   // ✅ REQUIRED FIELD (FIX)
      name: "New Chat",
      messages: [],
    });

    res.json({ success: true, chat });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET USER CHATS */
export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

