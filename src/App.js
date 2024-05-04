import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Data from "./Components/Data/Data";
import { DriveContext } from "./Context/DriveContext";
import Login from "./Components/Login/Login";

const App = () => {
  const { open, user } = useContext(DriveContext);
  return user === null ? (
    <Login />
  ) : (
    <>
      <Header />
      <div className={`${!open ? "App" : ""} ${open ? "show" : ""}`}>
        <Sidebar />
        <Data />
      </div>
    </>
  );
};

export default App;
