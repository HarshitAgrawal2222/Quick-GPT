import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User exists" });

    const user = await User.create({ name, email, password });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// API to get published image 
export const getPublishedImages = async (req,res) => {
  try {
    const getPublishedImageMessages = await Chat.aggregate([
      {$unwind: "$messages"},
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true
        }
      },
      {
        $project: {
          _id:0,
          imageUrl: "$messages.content",
          userName: "$userName"
        }
      }
    ])

    res.json({
      success:true, images: getPublishedImageMessages.reverse()
    })
  }catch(error){
    return res.json({ success:false, message:error.message});
  }
}

export const getUser = async (req, res) => {
  res.json({ success: true, user: req.user });
};
