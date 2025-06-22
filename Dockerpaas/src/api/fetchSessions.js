import axios from "axios";
import { auth } from "../firebase";

export const fetchSessions = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const response = await axios.get(`http://localhost:5000/api/sessions/get-sessions/${user.uid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
