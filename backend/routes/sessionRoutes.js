// backend/routes/sessionRoutes.js
import express from "express";
import { Session } from "../models/Session.js";

const router = express.Router();
console.log("✅ sessionRoutes.js loaded");

router.get("/test", (req, res) => {
  res.send("Session Routes are working ✅");
});
// ✅ Get all sessions (for testing or admin view)
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find(); // optionally: .limit(10)
    res.status(200).json(sessions);
  } catch (err) {
    console.error("❌ Error fetching all sessions:", err);
    res.status(500).json({ error: "Failed to get sessions" });
  }
});

// ✅ This must exist in backend/routes/sessionRoutes.js
router.get("/get-sessions/:userId", async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.userId });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("❌ Failed to get sessions:", err);
    res.status(500).json({ error: "Failed to fetch sessions." });
  }
});

router.post("/save-session", async (req, res) => {
  console.log("🔥 Hit /save-session");
  console.log("🔥 Session Save Request Body:", req.body);

  const { code, language, fileName, userId, description } = req.body;

  console.log("📦 Full Request Body:", req.body);
  console.log("📌 Description Field:", description);
  // ✅ FIRST: validate required fields
  if (!code || !language || !fileName || !userId) {
    console.log("❌ Missing fields:", { code, language, fileName, userId });
    return res.status(400).json({ error: "❌ Missing required fields" });
  }

  try {
    // ✅ THEN create the session
    const session = new Session({
      code,
      language,
      fileName,
      userId,
      description,
    });

    await session.save();
    res.status(200).json({ message: "Session saved successfully!" });
  } catch (err) {
    console.error("❌ MongoDB Save Error:", err.message);
    res.status(500).json({ error: "Failed to save session." });
  }
});

export default router;
