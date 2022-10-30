import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Issues from './pages/Issues';
import Issue from './pages/Issue';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Issues />} />
        <Route path="/issue/:pathId" element={<Issue />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
