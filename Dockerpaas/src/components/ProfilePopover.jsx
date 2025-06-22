import { Fragment } from "react";
import { Transition } from "@headlessui/react";


const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.map((p) => p[0].toUpperCase()).slice(0, 2).join("");
};

function ProfilePopover({ isOpen, user, onClose, onLogout }) {
  const initials = getInitials(user?.displayName || user?.name);

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition transform duration-200 ease-out"
      enterFrom="opacity-0 -translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition transform duration-150 ease-in"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 -translate-y-2 scale-95"
    >
      <div className="absolute right-6 top-16 w-64 bg-[#ead0ff] border border-gray-700 shadow-xl rounded-xl p-4 z-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow">
            {initials}
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">{user?.displayName}</p>
            <p className="text-sm text-[#0b0b0b]">{user?.email}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="flex-1 py-1 border border-[#0b0b0b] rounded mr-2 text-[#0b0b0b] hover:bg-white hover:text-black transition"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </Transition>
  );
}

export default ProfilePopover;
