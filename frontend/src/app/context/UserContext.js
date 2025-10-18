"use client";

import React, { createContext, useContext, useState } from "react";

// Create the User Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state
  const logout = () => {
    setUser(null);
    // Additional logout logic (e.g., clearing cookies or tokens)
    console.log("User logged out");
  };

  return (
    <UserContext.Provider value={{ user, setUser,logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use the context
export const useUser = () => useContext(UserContext);
