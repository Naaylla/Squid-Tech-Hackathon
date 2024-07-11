import React, { useState } from 'react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-[100vw] h-[100vh] fixed p-16 flex justify-end items-end'>
      {/* Chat Popup */}
      <div
        className={`fixed bottom-10 right-0 w-96 h-[80vh] bg-white shadow-lg rounded-lg p-4 overflow-hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
      <div
        className='bg-black flex justify-center items-center w-20 h-20 rounded-full cursor-pointer'
        onClick={toggleChat}
      >
        <img src='src/assets/chat.png' className='w-10 h-10' alt='Chat Icon' />
      </div>
    </div>
  );
}
