import React, { useState } from 'react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chat Popup */}
      <div
        className={`fixed bottom-3 right-2 w-96 h-[80vh] bg-white shadow-lg rounded-lg p-4 overflow-hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: isOpen ? 1001 : 1000 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Discussions</h2>
          <button onClick={toggleChat} className="text-xl">&times;</button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="overflow-y-auto h-full">
          {/* Chat Items */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center p-4 border-b">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img src="src/assets/chat.png" className="w-8 h-8" alt="User" />
              </div>
              <div className="ml-4 flex-1">
                <div className="font-bold">Dialog header</div>
                <div className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consec tetur adipiscing elit
                </div>
              </div>
              <div className="text-sm text-gray-400">10min</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center p-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
        </div>
      </div>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4" style={{ zIndex: isOpen ? 1000 : 1001 }}>
        <div
          className="bg-teal-800 hover:bg-teal-700 flex justify-center items-center w-20 h-20 rounded-full cursor-pointer"
          onClick={toggleChat}
        >
          <svg
            className="w-10 h-10 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
