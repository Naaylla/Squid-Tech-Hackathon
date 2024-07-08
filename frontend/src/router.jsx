import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import Signup from "./views/signup";
import Profile from "./views/profile";
import Evenements from "./views/evenements";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/evenements" element={<Evenements />}></Route>
      
    </Routes>
  );
};

export default Routers;
