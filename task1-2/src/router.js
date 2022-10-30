import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Issues from './pages/Issues';
import Issue from './pages/Issue';
import Header from './components/Header';
import { IssuesContextProvider } from './context/IssuesContext';
import { IssueContextProvider } from './context/IssueContext';
import Error404Page from './pages/Error404Page';

const Router = () => {
  return (
    <IssueContextProvider>
      <IssuesContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="/issue/:pathId" element={<Issue />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
      </IssuesContextProvider>
    </IssueContextProvider>
  );
};

export default Router;
