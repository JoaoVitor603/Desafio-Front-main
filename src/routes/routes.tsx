import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import List from '../pages/List';

const PrivateRoute = ({ children }): React.ReactElement => {
  const token = localStorage.getItem('userToken');

  return token ? children : <Navigate to="/" />;
};

const Rotes: React.FunctionComponent = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/List"
        element={
          <PrivateRoute>
            <List />
          </PrivateRoute>
        }
      />
    </Routes>
  </div>
);

export default Rotes;
