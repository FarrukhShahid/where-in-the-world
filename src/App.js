import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as Pages from './pages';
import { ContainerX } from './components';
import { ThemeProviderX } from './theme-context';
import { ApiVersionProviderX } from './api-version-context';



function App() {
  return (
    // Theme changes context api provider
    <ThemeProviderX> 
      {/**
       * API version v2 and v3.1 changes context api, header contains the select field for changing the api version 
       * This is because these apis tend to fail alot so to reduce the failed attempts to load data a drop down 
       * will help switch versions
       */}
      <ApiVersionProviderX>
        {/**
         * React Router
         */}
        <Router>
          {/**
           * A container to wrap the application, it provides the header and body to render pages
           */}
          <ContainerX>
            <Routes>
              {/* Home page to list all the countries */}
              <Route path="/" element={<Pages.Home />} />
               {/* Details page to show the details of a particular country  */}
              <Route path="/country/:name" element={<Pages.CountryDetail />} />
              <Route path='*' element={<Navigate to={"/"}/>}/>
            </Routes>
          </ContainerX>
        </Router>
      </ApiVersionProviderX>
    </ThemeProviderX>
  );
}

export default App;
