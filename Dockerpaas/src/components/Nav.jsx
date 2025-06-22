import { useState, useEffect } from "react";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeContext";
import ProfilePopover from "./ProfilePopover";


function Nav({
  user,
  onNewSessionClick,
  onHomeClick,
  onSessionsClick,
  onProfileClick,
  handleLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(() => {
  //   return localStorage.getItem("theme") === "light" ? false : true;
  // });

  // const navigate = useNavigate();
  // const { logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // User initials (GP, AR etc.)
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="bg-[#A074C4] text-[#0b0b0b] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">DockerPaaS</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
            className="hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSessionsClick();
            }}
            className="hover:text-white"
          >
            Sessions
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNewSessionClick();
            }}
            className="hover:text-white"
          >
            New Session
          </a>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="hover:text-white">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Profile Initials Circle */}
          <div className="relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-purple-700 font-bold cursor-pointer 
               border-2 border-transparent hover:border-purple-800 transition-all duration-200"
            >
              {initials}
            </div>
            <ProfilePopover
              isOpen={showProfile}
              user={user}
              onClose={() => setShowProfile(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full bg-white text-purple-700 font-bold flex items-center justify-center"
            title="Profile"
          >
            {initials}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1"
          >
            <span
              className="block w-6 h-0.5 bg-white transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(-45deg)" : "rotate(0)" }}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed top-[70px] right-4 md:hidden bg-[#A074C4] w-[160px] rounded-xl shadow-xl
                  animate-slide-in z-50 px-6 py-4 transition-all duration-300"
        >
          <ul className="flex flex-col text-[#0b0b0b] space-y-4 text-right">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onHomeClick();
                }}
                className="hover:text-purple-900 transition duration-150"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSessionsClick();
                }}
                className="hover:text-purple-900 transition duration-150"
              >
                Sessions
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNewSessionClick();
                }}
                className="hover:text-purple-900 transition duration-150"
              >
                New Session
              </a>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="text-yellow-400 text-sm hover:text-purple-900 transition duration-150"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
