import React, { createContext, useState } from "react";

export const DriveContext = createContext(null);

const DriveProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [totalStorage, setTotalStorage] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchName, setSearchName] = useState("");
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const resetSidebar = () => {
    setOpen(false);
  };

  const contextValue = {
    open,
    totalStorage,
    user,
    showDropdown,
    searchName,
    toggleSidebar,
    resetSidebar,
    setTotalStorage,
    setUser,
    setShowDropdown,
    setSearchName,
  };

  return (
    <DriveContext.Provider value={contextValue}>
      {children}
    </DriveContext.Provider>
  );
};

export default DriveProvider;
