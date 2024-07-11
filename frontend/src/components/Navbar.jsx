import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import NotificationsToggle from "./NotificationsToggle";

export default function Navbar() {
  const [showBorderBottom, setShowBorderBottom] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBorderBottom(true);
      } else {
        setShowBorderBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div
        className={`w-full flex fixed top-0 left-0 bg-teal-700 text-white justify-between items-center px-4 md:px-14 py-5 z-40 ${
          showBorderBottom ? "border-b-2" : ""
        }`}
      >
        <img src="./Logo blue.svg" className="w-32 md:w-40" alt="Logo" />

        <div className="flex items-center md:hidden">
          <div className="flex items-center gap-1">
            <div className="flex">
              <m.button>
                <svg
                  className="w-10 h-8 text-white dark:text-white"
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
              </m.button>
              <m.button onClick={handleNotificationClick}>
                <svg
                  className="w-10 h-8 text-white dark:text-white"
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
                    d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                  />
                </svg>
              </m.button>
              <m.button
                onClick={() => {
                  window.location.href = "/profile";
                }}
              >
                <svg
                  className="w-10 h-9 text-white dark:text-white"
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
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </m.button>
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 bg-white text-black rounded-md pl-2 pr-2 py-1 w-32 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-white ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex flex-row items-center font-semibold gap-4 md:gap-20 mr-5">
        <m.button
      whileHover={{
        borderBottom: "2px solid white",
        transition: { type: "tween", duration: 0.3 },
      }}
      onClick={() => {
        scrollTo("Home");
      }}
      style={{ borderBottom: "2px solid transparent" }}
    >
      Accueil
    </m.button>


          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.location.href = "/evenements";
            }}
          >
            Évènements
          </m.button>
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.5 }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            S.I.E
          </m.button>

          <div className="relative w-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 bg-white text-black rounded-md pl-10 pr-3 py-2 w-64 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="w-6 h-6 text-gray-300 dark:text-gray-300"
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
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-1 justify-end">
            {/* Friends button*/}
         <m.button className="w-8">
         <img src="../src/assets/Friends.svg" className="w-8 text-white"></img>
</m.button>



            {/* Notification icon*/}
            <div className="relative">
  <m.button className="p-2" onClick={handleNotificationClick}>
    <svg
      className="w-10 h-8 text-white dark:text-white"
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
        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
      />
    </svg>
  </m.button>
  {notificationsOpen && <NotificationsToggle />}
</div>

            {/* Profile icon*/}
            <m.button className="mr-[-3vw] p-2"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <img src="../src/assets/user-circle.svg" className="w-8 text-white"></img>
            </m.button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col items-center bg-teal-700 text-white py-4 z-30 w-full fixed top-16 left-0 md:hidden">
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              scrollTo("Home");
              setMenuOpen(false);
            }}
            className="py-2"
          >
            Accueil
          </m.button>
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.location.href = "/evenements";
              setMenuOpen(false);
            }}
            className="py-2"
          >
            Évènements
          </m.button>
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.5 }}
            onClick={() => {
              window.location.href = "/dashboard";
              setMenuOpen(false);
            }}
            className="py-2"
          >
            S.I.E
          </m.button>
        </div>
      )}
    </div>
  );
}