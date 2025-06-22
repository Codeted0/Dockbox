// backend/index.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import sessionRoutes from './routes/sessionRoutes.js';
import executeRoutes from './routes/executeRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB(); // ✅ Wait for DB connection

  // ✅ Root route to fix "Cannot GET /"
  app.get("/", (req, res) => {
    res.send("🚀 Dockbox Backend is Live!");
  });

  app.use('/api/execute', executeRoutes);
  app.use('/api/sessions', sessionRoutes);

  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
};

startServer();
