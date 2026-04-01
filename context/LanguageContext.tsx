"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";

type Language = "fr" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    // Check local storage for language preference
    const storedLang = localStorage.getItem("app_lang") as Language;
    if (storedLang && (storedLang === "fr" || storedLang === "ar")) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    // Update direction and class for fonts
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("app_lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "ar" : "fr"));
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = language === "fr" ? fr : ar;
    for (const key of keys) {
      if (current[key] === undefined) {
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
