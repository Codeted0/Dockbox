import { useEffect, useState } from "react";
import { fetchSessions } from "../api/fetchSessions";
import { useTheme } from "./ThemeContext";

const SavedSessions = ({ onOpenSession }) => {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchSessions();
        setSessions(data);
      } catch (err) {
        console.error("❌ Error loading sessions:", err);
      }
    };
    loadSessions();
  }, []);
 const { darkMode } = useTheme();
  const getLangIcon = (language) => {
    const lang = (language || "").toLowerCase();
    switch (lang) {
      case "javascript":
        return "/icons/javascript.png";
      case "python":
        return "/icons/python.png";
      case "cpp":
        return "/icons/cpp.png";
      case "java":
        return "/icons/java.png";
      default:
        return "/icons/default.png";
    }
  };

  const filteredSessions = sessions.filter((session) =>
    (session.fileName || "Untitled")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex justify-center items-center h-[calc(100vh-64px)] bg-[#0b0b0b] ${
        darkMode ? "bg-[#353535] text-white" : "bg-[#e9d8fb] text-black"
      }`}>
      <div className={`w-full h-full overflow-y-auto py-6 px-4 space-y-4 ]  ${darkMode ? "bg-[#1b1b1b] text-white" : "bg-[#e9d8fb] text-black"} rounded-xl max-w-7xl transition-opacity duration-500 opacity-100`}>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search session by name..."
          className={`w-full md:w-1/2 p-3 rounded-md mb-4  ${darkMode ? "bg-[#2e2d2d] text-white" : "bg-[#c5a2eb] text-black"}  focus:outline-none focus:ring-2 focus:ring-purple-500`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Session List */}
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div
              key={session._id}
              className={`border border-[#fff] ${darkMode ? "bg-[#2b2b2b]  text-white" : "bg-[#A074C4] text-black"} p-4 rounded-lg flex justify-between items-center 
              transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={getLangIcon(session.language)}
                  alt="Lang Icon"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <div className={`text-xl font-bold  ${darkMode ? " text-white" : " text-black"}`}>
                    {session.fileName || "Untitled"}
                  </div>
                  <p className={`text-sm   ${darkMode ? " text-gray-400" : " text-black"}`}>
                    {session.language || "unknown language"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenSession(session)}
                className={` ${darkMode ? " bg-[#9a67c5] text-white hover:bg-[#7d5e8f]" : "bg-[#e1c3f9] border border-[#c98cfb] hover:bg-[#7d5e8f] text-black"} px-4 py-2 rounded-md text-lg font-bold transition-all duration-200`}
              >
                Open →
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedSessions;
