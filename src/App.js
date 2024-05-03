import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Data from "./Components/Data/Data";
import { DriveContext } from "./Context/DriveContext";

class App extends Component {
  static contextType = DriveContext;
  render() {
    const { open } = this.context;
    console.log(open);
    return (
      <>
      <Header />
      <div className={`${!open ? "App" : ""} ${open ? "show" : ""}`}>
        <Sidebar />
        <Data />
      </div>
      </>
    );
  }
}

export default App;
