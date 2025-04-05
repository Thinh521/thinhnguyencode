import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  return (
    <LoadingContext.Provider value={{ loading, handleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
