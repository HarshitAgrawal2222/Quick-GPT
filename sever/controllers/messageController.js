import axios from "axios";
import Chat from "../models/Chat.js";
import OpenAI from "openai";
import imagekit from "../configs/imageKit.js";
import openai from "../configs/openai.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // check credits 
    if(req.user.credits < 1){
        return res.json({success:false, message:"You don't have enough credits to use this feature "})
    }

    const { chatId, prompt } = req.body; // ✅ fixed typo

    const chat = await Chat.findOne({ userId, _id: chatId });

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ⚠️ Gemini is NOT supported by OpenAI
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save();

    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // check credits
    if (req.user.credits < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { prompt, chatId, isPublished } = req.body;

    // Find chat
    const chat = await Chat.findOne({ userId, _id: chatId });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });
    // Encode the prompt
const encodedPrompt = encodeURIComponent(prompt);

// Construct ImageKit AI generation URL
const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/
ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;


   //Trigger generation by fetching from ImageKit
   const aiImageresponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})

   // convert to base 64
   const base64Image = `data:image/png;base64,${Buffer.from(aiImageresponse.data,"binary").toString('base64')}`

   //upload to Image kit Media Library
   const uploadResponse = await imagekit.upload({
    file: base64Image,
    fileName: `${Date.now()}.png`,
    folder: "quickgpt"
   })

   const reply = {
    role: 'assistant',
    content: uploadResponse.url,
    timestamp: Date.now(),
    isImage: true,
    isPublished
  };

    await chat.save();

    res.json({ success: true ,reply});

    chat.messages.push(reply)
    await chat.save()

    await User.updateOne({_id: userId},{$inc: {credits: -2}})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

