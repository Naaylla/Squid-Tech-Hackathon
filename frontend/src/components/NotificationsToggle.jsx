import React from "react";
import { motion as m } from "framer-motion";

export default function NotificationsToggle() {
  return (
    <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md p-2 z-30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button className="text-gray-500">
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
      <div className="mt-2">
        <p className="text-gray-600">No new notifications.</p>
      </div>
    </div>
  );
}
