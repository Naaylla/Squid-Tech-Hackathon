import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LandingPage from "./views/landing";
import Signup from "./views/auth/signup";
import Login from "./views/auth/login";
import Reset from "./views/auth/reset";
import Verify from "./views/auth/verify"
import Home from "./views/home/index"
import Profile from "./views/profile";
import Evenements from "./views/evenements";
import Dashboard from "./views/dashboard";
import "./index.css";

const Routers = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/verify-code" element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routers;