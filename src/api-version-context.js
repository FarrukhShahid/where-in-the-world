import React, { createContext, useState } from 'react';

// Create the context
export const ApiVersionContext = createContext();

export const ApiVersionProviderX = ({ children }) => {
  const [apiVersion, setApiVersion] = useState(localStorage.getItem('api-version') || 2);

  const changeApiVersion = (version) => {
    setApiVersion(version);
    localStorage.setItem("api-version", version);
  };

  return (
    <ApiVersionContext.Provider value={{ apiVersion, changeApiVersion }}>
        {children}
    </ApiVersionContext.Provider>
  );
};
