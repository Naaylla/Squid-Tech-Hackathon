import React from "react";

export default function FriendsList({ onClose }) {
  const friends = [
    {
      id: 1,
      name: "John Doe",
      status: "Online",
      avatar: "../src/assets/user-circle.svg"
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Offline",
      avatar: "../src/assets/user-circle.svg"
    },
    {
      id: 3,
      name: "Michael Brown",
      status: "Busy",
      avatar: "../src/assets/user-circle.svg"
    },
    {
      id: 4,
      name: "Emily Johnson",
      status: "Away",
      avatar: "../src/assets/user-circle.svg"
    }
  ];

  return (
    <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md p-4 z-30 w-80">
      <div className="flex items-center justify-between mb-4">
      <p className="text-black mr-2">Friends list</p>
        <h3 className="text-lg font-semibold">Friends List</h3>
        <button onClick={onClose} className="text-gray-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-4">
        {friends.map(friend => (
          <div key={friend.id} className="flex items-center space-x-4">
            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold">{friend.name}</h4>
              <p className="text-sm text-gray-600">{friend.status}</p>
            </div>
            <button className="text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12M6 6h12M6 18h12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
