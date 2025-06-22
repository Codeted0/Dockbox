import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
// import { FiDownload, FiSave } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { saveSession } from "../api/saveSession";
import { FiDownload, FiFileText, FiCode } from "react-icons/fi";
import { VscSave, VscDebugStart } from "react-icons/vsc";
import { useTheme } from "./ThemeContext";
// import { Description } from "@headlessui/react";

function CodeEditor({ language, fileName, description }) {
  const [code, setCode] = useState(() => {
    return localStorage.getItem("userCode") || `Enter Your code here`;
  });

  const { darkMode } = useTheme();
  console.log("🚨 Name recieved from mainapp:", fileName);
  const [input, setInput] = useState("");
  // const [fileName, setName] = useState("");
  const [output, setOutput] = useState(() => {
    return localStorage.getItem("userOutput") || "";
  });

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [currentDescription, setCurrentDescription] = useState(
    description || ""
  );
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }
  useEffect(() => {
    console.log("🚨 Language prop received:", language);
  }, [language]);
  useEffect(() => {
    console.log("🚨 Name recieved:", fileName);
  }, [fileName]);
  useEffect(() => {
    localStorage.setItem("userCode", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("userOutput", output);
  }, [output]);
  useEffect(() => {
    console.log("📝 Description received in CodeEditor:", description);
    setCurrentDescription(description || ""); // Keep updated
  }, [description]);
  useEffect(() => {
  console.log("📩 [CodeEditor] Props received:", { language, fileName, description });
}, [language, fileName, description]);

  // 🧠 Get extension from language
  const getExtension = (lang) => {
    switch (lang) {
      case "javascript":
        return "js";
      case "python":
        return "py";
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      default:
        return "txt";
    }
  };

  const handleRunCode = async () => {
    console.log("🔁 Sending code to backend:", {
      url: "http://localhost:5000/run",
      code,
      language,
      input,
      fileName,
      description,
    });

    try {
      const response = await fetch("http://localhost:5000/api/execute/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, input, fileName }),
      });

      const data = await response.json();
      console.log("✅ Response:", data);
      setOutput(data.error ? `Error: ${data.error}` : data.output);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
      setOutput("Error: Backend server is not responding.");
    }
  };
  const handleSaveSession = async () => {
    try {
      const payload = {
        name: fileName || "Untitled",
        code,
        language,
        description: currentDescription,
      };
      console.log("description :", description);
      console.log("name" + payload.name);
      toast.loading("Saving session...");
      const res = await saveSession(payload);
      toast.dismiss();
      toast.success("Session saved successfully!");
      console.log("✅ MongoDB Save Response:", res);
    } catch (error) {
      toast.dismiss();
      console.error("❌ Save session failed:", error);
      toast.error("Failed to save session");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    // <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 bg-white dark:bg-[#353535] text-black dark:text-white h-screen overflow-hidden transition-colors duration-300">
    <div
      className={`flex flex-col gap-4 p-4 md:p-6 lg:p-8 ${
        darkMode ? "bg-[#353535] text-white" : "bg-[#e9d8fb] text-black"
      } min-h-screen transition-colors duration-300`}
    >
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-4 py-2 px-4  ${
          darkMode ? "bg-[#2b2b2b]" : "bg-[#f0e4fa]"
        } rounded-md gap-3 md:gap-0`}
      >
        {/* File and Language Info */}
        <div
          className={`flex flex-wrap items-center gap-3 ${
            darkMode ? "text-white" : "text-[#1d1d1d]"
          }  font-medium`}
        >
          {/* File Name */}
          <div
            className={`flex items-center gap-2  ${
              darkMode ? "bg-[#3a3a3a]" : "bg-[#A074C4]"
            } px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ease-in-out`}
          >
            <FiFileText
              size={16}
              className={`${darkMode ? "text-purple-400" : "text-[#3a3a3a]"}`}
            />
            <span className="text-sm">{fileName || "Untitled"}</span>
          </div>

          {/* Language */}
          <div
            className={`flex items-center gap-2  ${
              darkMode ? "bg-[#3a3a3a]" : "bg-[#A074C4]"
            } px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ease-in-out`}
          >
            <FiCode
              size={16}
              className={`${darkMode ? "text-green-400" : "text-[#3a3a3a]"}`}
            />
            <span className="text-sm">
              {language
                ? language.charAt(0).toUpperCase() + language.slice(1)
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-3 mt-2 md:mt-0">
          {/* Export Button */}
          <button
            onClick={() => {
              const ext = getExtension(language);
              const blob = new Blob([code], { type: "text/plain" });
              const element = document.createElement("a");
              element.href = URL.createObjectURL(blob);
              element.download = `${fileName || "code"}.${ext}`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="p-2 rounded-md bg-gray-700 text-white shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:bg-gray-600 "
            title="Export Code"
          >
            <FiDownload size={18} />
          </button>
          {/* Save Button */}
          <button
            onClick={handleSaveSession}
            className="p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
            title="Save"
          >
            <VscSave size={18} />
          </button>

          {/* Run Button */}
          <button
            onClick={handleRunCode}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
            title="Run Code (Ctrl+Enter)"
          >
            <VscDebugStart size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 w-full lg:w-1/2 focus-within:ring-2 focus-within:ring-[#A074C4] transition duration-200">
          <Editor
            key={language}
            height="400px" 
            language={language} // ✅ this updates live
            theme={darkMode ? "vs-dark" : "light"}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
          />
        </div>
        <div
          className={`w-full lg:w-1/2  ${
            darkMode ? "bg-[#1F1F1F]" : "bg-gray-100"
          } border border-green-300 rounded-lg p-4 shadow-md space-y-4`}
        >
          {/* Input Terminal */}
          <div>
            <h2
              className={`text-lg font-semibold  ${
                darkMode ? "text-yellow-300" : "text-[#985dc9]"
              } `}
            >
              Input (Terminal):
            </h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here..."
              className={`w-full h-24 ${
                darkMode
                  ? "bg-[#353535] text-white"
                  : "bg-[#e9d8fb] text-[#353535] border border-purple-300"
              }   p-3 rounded resize-none focus:outline-none`}
            />
          </div>

          {/* Output Terminal */}
          <div>
            <h2
              className={`"text-lg font-semibold ${
                darkMode ? "text-white" : "text-[#985dc9]"
              } mb-2"`}
            >
              Output:
            </h2>
            <pre
              className={` "whitespace-pre-wrap text-sm ${
                darkMode
                  ? "bg-[#353535] text-white"
                  : "bg-[#e9d8fb] text-[#353535] border border-purple-300"
              } p-3 rounded h-48 overflow-auto"`}
            >
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
