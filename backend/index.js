// backend/index.js
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import executeRoutes from "./routes/executeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB(); // ✅ Wait for DB connection

  // ✅ Root route to fix "Cannot GET /"
  app.get("/", (req, res) => {
    res.send("🚀 Dockbox Backend is Live!");
  });
  // Allow frontend access (adjust Vercel URL as needed)
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://dockbox.vercel.app"],
      credentials: true,
    })
  );

  app.use("/api/execute", executeRoutes);
  app.use("/api/sessions", sessionRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
