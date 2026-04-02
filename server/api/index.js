import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS (important)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.post("/api/user/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing details"
    });
  }

  return res.json({
    success: true,
    message: "Registered successfully"
  });
});

// ❌ DO NOT USE app.listen()

export default app;