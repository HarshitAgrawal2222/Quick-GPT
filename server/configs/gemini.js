import axios from "axios";

const response = await axios.post("http://localhost:11434/api/generate", {
  model: "llama3",
  prompt: prompt,
  stream: false,
});

const text = response.data.response;