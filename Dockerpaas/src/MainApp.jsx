import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Nav";
import CodeEditor from "./components/CodeEditor";
import NewSessionModal from "./components/NewSessionModal";
import SavedSessions from "./components/SavedSessions"; // 🆕 Import this
import { saveSession } from "./api/saveSession";
import ProfilePopover from "./components/ProfilePopover";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

function MainApp() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(Date.now());
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "javascript";
  });
  // const [fileName, setFileName] = useState("");
  const [fileName, setFileName] = useState(
    () => localStorage.getItem("selectedFileName") || "Untitled"
  );
  const [view, setView] = useState("editor"); // 🆕 'editor' or 'sessions'
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [description, setDescription] = useState(""); // ✅ Add this

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("👤 Logged in user:", currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);
  console.log("🧠 Firebase user info:", user);

  // ✅ Load session from location.state if available
  useEffect(() => {
    if (location.state?.session) {
      const session = location.state.session;
      setLanguage(session.language || "javascript");
      setFileName(session.fileName || "Untitled");
      setDescription(session.description); // ❗ this line is missing
      console.log("📄 Setting Description:", session.description);

      localStorage.setItem(
        "selectedLanguage",
        session.language || "javascript"
      );
      localStorage.setItem("selectedFileName", session.fileName || "Untitled");
      localStorage.setItem("userCode", session.code || "// No code");
      setEditorKey(Date.now()); // Force remount
    }
  }, [location.state]);
  const handleOpenSession = (session) => {
    setLanguage(session.language || "javascript");
    setFileName(session.fileName || "Untitled");
    localStorage.setItem("selectedLanguage", session.language || "javascript");
    localStorage.setItem("selectedFileName", session.fileName || "Untitled");
    localStorage.setItem("userCode", session.code || "// No code");
    setEditorKey(Date.now()); // force re-render
    setView("editor"); // switch view to editor
  };

  const handleNewSession = async (session) => {
    console.log("🧠 Received from Modal:", session);
    try {
      await saveSession({
        fileName: session.name,
        language: session.language,
        code: session.code,
        description: session.description,
        userId: user?.uid,
      });
      console.log("📤 Sending to saveSession():", saveSession); // Final payload check
      console.log("New session created:", session);
      setLanguage(session.language);
      setFileName(session.fileName);
      setDescription(session.description);

      localStorage.setItem("selectedLanguage", session.language);
      localStorage.setItem("selectedFileName", session.fileName);
      setEditorKey(Date.now());
      localStorage.removeItem("userCode");
      localStorage.removeItem("userOutput");
      setView("editor"); // ensure editor is visible
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      setIsProfileOpen(false);
      console.log("🔓 User signed out");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

console.log("🧠 [MainApp] Passing to CodeEditor:", { language, fileName, description });


  return (
    <div className="h-screen overflow-auto lg:overflow-hidden bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300">
      <Navbar
        user={user}
        onNewSessionClick={() => setIsModalOpen(true)}
        onHomeClick={() => setView("editor")} // 🆕
        onSessionsClick={() => setView("sessions")}
        onProfileClick={() => setIsProfileOpen(true)} // 🆕
      />

      {/* Conditional rendering based on view */}
      {view === "editor" && (
        <CodeEditor
          key={editorKey}
          language={language}
          fileName={fileName}
          description={description}
        />
      )}
      {view === "sessions" && (
        <div className="h-[calc(100vh-64px)] overflow-auto lg:overflow-hidden">
          <SavedSessions onOpenSession={handleOpenSession} />
        </div>
      )}
      {/* 🆕 */}
      <ProfilePopover
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={{ name: user?.displayName, email: user?.email }}
        onLogout={handleLogout}
      />

      <NewSessionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSession={handleNewSession}
      />
    </div>
  );
}

export default MainApp;
