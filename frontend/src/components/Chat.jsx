import React, { useState } from 'react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([
    { id: 1, header: 'Nayla', messages: [{  sender: 'other' }], time: '10min' },
    { id: 2, header: 'Leenah', messages: [{  sender: 'other' }], time: '20min' },
    { id: 3, header: 'Mehdi', messages: [{  sender: 'other' }], time: '30min' },
    { id: 4, header: 'Masked Gamers', messages: [{ sender: 'other' }], time: '40min' },
  ]);

  const [messageInput, setMessageInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === selectedConversation.id) {
        return {
          ...conversation,
          messages: [...conversation.messages, { text: messageInput, sender: 'me' }],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, { text: messageInput, sender: 'me' }],
    });
    setMessageInput('');
  };

  const goBackToConversations = () => {
    setSelectedConversation(null);
  };

  return (
    <div className='w-[100vw] z-10 h-[100vh] fixed p-16 flex justify-end items-end'>
      {/* Chat Popup */}
      <div
        className={`fixed bottom-10 right-0 w-96 h-[80vh] bg-white shadow-lg rounded-lg p-4 overflow-hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{selectedConversation ? selectedConversation.header : 'Discussions'}</h2>
          <button onClick={toggleChat} className="text-xl">&times;</button>
        </div>

        {selectedConversation ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <button onClick={goBackToConversations} className="text-blue-500 underline">Back to Conversations</button>
            </div>
            <div className="overflow-y-auto flex-1 mb-4">
              <div className="flex flex-col space-y-4 p-4">
                {selectedConversation.messages.map((msg, index) => (
                  <div className={`flex items-start ${msg.sender === 'me' ? 'justify-end' : ''}`} key={index}>
                    <div className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4 ${msg.sender === 'me' ? 'order-2' : ''}`}>
                      <img src="src/assets/chat.png" className="w-6 h-6" alt="User" />
                    </div>
                    <div className={`bg-${msg.sender === 'me' ? 'blue-500 text-white' : 'gray-100 text-black'} p-2 rounded-lg`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center border-t p-4">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full p-2 border rounded mr-2 text-gray-500"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">Send</button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full p-2 border rounded text-gray-500"
              />
            </div>
            <div className="overflow-y-auto h-full">
              {/* Chat Items */}
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center p-4 border-b hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src="src/assets/chat.png" className="w-8 h-8" alt="User" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-bold">{conversation.header}</div>
                    <div className="text-sm text-gray-600">
                      {conversation.messages.length > 0 && conversation.messages[conversation.messages.length - 1].text}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{conversation.time}</div>
                </div>
              ))}
            </div>
          </>
        )}
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
