import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTheme } from "./ThemeContext";

function NewSessionModal({ open, onClose, onCreateSession }) {
  const [sessionName, setSessionName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [description, setDescription] = useState("");

  const { darkMode } = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateSession({
      fileName: sessionName,
      language: language,
      description: description,
    });

    // Reset fields
    setSessionName("");
    setLanguage("javascript");
    setDescription("");

    onClose(); // Close modal
  };

  return (
    <Transition appear show={!!open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
        open={!!open}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl   ${darkMode ? "bg-[#1F1F1F]" : "bg-[#8a67a6]"} p-6 text-left align-middle shadow-xl transition-all`}>
                <Dialog.Title
                  as="h3"
                  className={`"text-lg font-medium leading-6   ${darkMode ? "text-white" : "text-gray-900"}"`}
                >
                  Create New Session
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className={`"block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}"`}>
                      Session Name
                    </label>
                    <input
                      type="text"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                      required
                      className={`"mt-1 block w-full rounded-md   ${darkMode ? "text-white bg-gray-700 border-gray-600" : "text-black bg-[#c5b8d1] border-gray-300"} shadow-sm focus:border-[#A074C4] focus:ring-[#A074C4] sm:text-sm"`}
                    />
                  </div>

                  <div>
                    <label className={`"block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}"`}>
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`"mt-1 block w-full rounded-md ${darkMode ? "text-white bg-gray-700 border-gray-600" : "text-gray-800 bg-[#c5b8d1] border-gray-300" } shadow-sm focus:border-[#A074C4] focus:ring-[#A074C4] sm:text-sm"`}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>
                  </div>

                  <div>
                  <label className={`"block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}"`}>
                      Description
                    </label>
                    <textarea
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`"mt-1 block w-full rounded-md ${darkMode ? "text-white bg-gray-700 border-gray-600" : "text-black bg-[#c5b8d1] border-gray-300"} shadow-sm focus:border-[#A074C4] focus:ring-[#A074C4] sm:text-sm"`}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 mr-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-[#A074C4] text-white rounded-md hover:bg-[#8a5bb0]"
                    >
                      Create Session
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default NewSessionModal;
