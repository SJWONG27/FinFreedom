// Premium.js

import React, { createContext, useState, useContext } from 'react';

const PremiumContext = createContext();

export const usePremiumStatus = () => {
  return useContext(PremiumContext);
};

export const PremiumProvider = ({ children }) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const togglePremiumStatus = () => {
    setIsPremiumUser((prevStatus) => !prevStatus);
  };

  return (
    <PremiumContext.Provider value={{ isPremiumUser, togglePremiumStatus }}>
      {children}
    </PremiumContext.Provider>
  );
};
