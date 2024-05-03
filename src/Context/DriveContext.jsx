import React, { createContext, useState } from "react";

export const DriveContext = createContext(null);

const DriveProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const resetSidebar = () => {
        setOpen(false);
    }

    const contextValue = {
        open,
        toggleSidebar,
        resetSidebar,
    };

    return (
        <DriveContext.Provider value={contextValue}>
            {children}
        </DriveContext.Provider>
    );
};

export default DriveProvider;
