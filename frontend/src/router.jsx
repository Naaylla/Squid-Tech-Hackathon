import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import Signup from "./views/signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default Routers;
