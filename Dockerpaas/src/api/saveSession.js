// src/api/saveSession.js
import axios from "axios";
import { auth } from "../firebase";

export const saveSession = async ({ name, language, code, description }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  console.log(description)
  const payload = {
    fileName: name || "Untitled",
    language: language || "unknown",
    description: description || "", // ✅ Include description
    code: code || "// No code provided",
    userId: user.uid,
  };

  console.log("🔍 Session Payload:", payload); // helpful!

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/sessions/save-session`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

