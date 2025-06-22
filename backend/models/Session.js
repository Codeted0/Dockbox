// backend/models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  fileName: { type: String },
  description: { type: String, default: "" },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Session = mongoose.model("Session", sessionSchema);
