// backend/index.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import sessionRoutes from './routes/sessionRoutes.js'; // ✅ LOWERCASE "routes"
import executeRoutes from './routes/executeRoutes.js';

// const app = express();
// app.use(cors());
// app.use(express.json());

// await connectDB();

// // ✅ This is what makes /api/sessions/save-session available!
// app.use('/api/sessions', sessionRoutes);

// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB(); // ✅ Wait for DB connection
  app.use('/api/execute', executeRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
};

startServer();