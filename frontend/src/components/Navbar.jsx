import React, { useState, useEffect, useRef } from "react";
import { motion as m } from "framer-motion";
import NotificationsToggle from "./NotificationsToggle";
import FriendsList from "./FriendsList";

export default function Navbar() {
  const [showBorderBottom, setShowBorderBottom] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);

  const friendsListRef = useRef(null);
  const notificationsRef = useRef(null);

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleFriendsClick = () => {
    setFriendsOpen(!friendsOpen);
  };

  const closeFriendsList = () => {
    setFriendsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBorderBottom(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        friendsListRef.current &&
        !friendsListRef.current.contains(event.target) &&
        friendsOpen
      ) {
        setFriendsOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        notificationsOpen
      ) {
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [friendsOpen, notificationsOpen]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        className={`w-full flex fixed top-0 left-0 bg-teal-700 text-white justify-between items-center px-4 md:px-14 py-5 z-40 ${showBorderBottom ? "border-b-2" : ""
          }`}
      >
        <img src="./Logo blue.svg" className="w-32 md:w-40" alt="Logo" />

        <div className="flex items-center md:hidden">

          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div
          className={`flex-col md:flex md:flex-row md:items-center font-semibold gap-4 md:gap-20 mr-5 ${menuOpen ? "flex" : "hidden"
            }`}
        >
          <m.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Accueil
          </m.button>
          <m.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              window.location.href = "/evenements";
            }}
          >
            Évènements
          </m.button>
          <m.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Suivi de l'Impact Ecologique
          </m.button>
          <div className="relative w-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-gray-300 bg-white text-black rounded-full pl-10 pr-3 py-2  w-80  focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="flex gap-1 justify-end">
            <div className="relative" ref={friendsListRef}>
              <m.button className="w-9 mt-4" onClick={handleFriendsClick}>
                <img
                  src="../src/assets/Friends.svg"
                  className="w-9 text-white"
                  alt="Friends"
                />
              </m.button>
              {friendsOpen && <FriendsList />}
            </div>
            <div className="relative" ref={notificationsRef}>
              <m.button className="p-4 mr-4" onClick={handleNotificationClick}>
                <svg
                  className="w-10 h-8 text-white dark:text-white"
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
            <m.button
              className="mr-[-3vw] p-2"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <img
                src="../src/assets/user-circle.svg"
                className="w-8 text-white"
                alt="Profile"
              />
            </m.button>
          </div>
        </div>
      </div>
    </div>
  );
}
