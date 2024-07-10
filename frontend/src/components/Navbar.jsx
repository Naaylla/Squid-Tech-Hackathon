
import React from "react";
import { useState } from "react";
import { motion as m } from "framer-motion";

export default function Navbar() {
  const [showBorderBottom, setShowBorderBottom] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setShowBorderBottom(true);
    } else {
      setShowBorderBottom(false);
    }
  });

  // smooth scroll
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={` w-full flex fixed bg-white justify-between items-center px-14 py-5 z-40 ${
        showBorderBottom ? "border-b-2" : ""
      }`}
    >
      <img src="./Logo blue.svg" className="w-40"></img>

      <div className="font-semibold flex gap-20">
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            scrollTo("Home");
          }}
        >
          Accueil
        </m.button>
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            scrollTo("About");
          }}
        >
          Évènements
        </m.button>
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.location.href = "/dashboard";
          
          }}
        >
          S.I.E
        </m.button>
        
       
      </div>
      <div className="flex gap-5">
        <m.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.location.href = "/login";
          }}
          className=" text-blue"
        >
          Log in
        </m.button>
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.location.href = "/signup";
          }}
          className=" rounded-3xl bg-green-900 text-white px-4 py-2"
        >
          Sign up
        </m.button>
      </div>
    </div>
  );
}
