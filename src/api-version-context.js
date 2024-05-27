import React, { createContext, useState } from 'react';

// Create the context
export const ApiVersionContext = createContext();

export const ApiVersionProviderX = ({ children }) => {
  // Get the current api version in a state
  const [apiVersion, setApiVersion] = useState(localStorage.getItem('api-version') || 2);

  // Handler to change the api version
  const changeApiVersion = (version) => {
    // setting and saving the api version
    setApiVersion(version);
    localStorage.setItem("api-version", version);
  };

  return (
    <ApiVersionContext.Provider value={{ apiVersion, changeApiVersion }}>
        {children}
    </ApiVersionContext.Provider>
  );
};
