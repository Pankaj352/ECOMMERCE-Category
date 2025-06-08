import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const OtpProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <DataContext.Provider
      value={{ userId, setUserId, userEmail, setUserEmail }}>
      {children}
    </DataContext.Provider>
  );
};

export const useContextAPI = () => useContext(DataContext);
