import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  toast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = "default" }) => {
    // In a real implementation, we would show a toast notification
    // For now, we'll just log to console
    console.log(`Toast [${variant}]: ${title} - ${description}`);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}; 