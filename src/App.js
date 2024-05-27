import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as Pages from './pages';
import { ContainerX } from './components';
import { ThemeProviderX } from './theme-context';
import { ApiVersionProviderX } from './api-version-context';



function App() {
  return (
    <ThemeProviderX>
      <ApiVersionProviderX>
        <Router>
          <ContainerX>
            <Routes>
              <Route path="/" element={<Pages.Home />} />
              <Route path="/country/:name" element={<Pages.CountryDetail />} />
            </Routes>
          </ContainerX>
        </Router>
      </ApiVersionProviderX>
    </ThemeProviderX>
  );
}

export default App;
