import React, { useState } from "react";
import { motion as m } from "framer-motion";

export default function NotificationsToggle() {
  const [isOpen, setIsOpen] = useState(true); // State to manage open/close of notifications

  const notifications = [
    {
      id: 1,
      header: "Dialog header",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10min"
    },
    {
      id: 2,
      header: "Dialog header",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10min"
    },
    {
      id: 3,
      header: "Dialog header",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10min"
    },
    {
      id: 4,
      header: "Dialog header",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "10min"
    }
  ];

  const toggleNotifications = () => {
    setIsOpen(!isOpen); // Toggle open/close state
  };

  return (
    <>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md p-4 z-30 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-semibold">Notifications</h3>
            <button className="text-gray-500" onClick={toggleNotifications}>
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1117.804 5.12M15 15l5 5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{notification.header}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
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
      )}
    </>
  );
}
