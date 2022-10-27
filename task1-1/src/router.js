import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CheckAccessToken from './components/CheckAccessToken';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAccessToken>
              <Signin />
            </CheckAccessToken>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todo"
          element={
            <CheckAccessToken>
              <TodoList />
            </CheckAccessToken>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
