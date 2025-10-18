"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Global variable to store language for other modules
let currentLanguage = "en"; // Default language

export const getCurrentLanguage = () => currentLanguage; // Function to retrieve the global language

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(currentLanguage); // Default language is English

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    currentLanguage = newLanguage; // Update the global variable
    localStorage.setItem("preferredLanguage", newLanguage); // Persist the selected language
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      currentLanguage = savedLanguage; // Update global variable on load
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
