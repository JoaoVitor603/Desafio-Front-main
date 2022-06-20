import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Error from "../pages/Error";
import List from "../pages/List";

// components;

const Rotes: React.FunctionComponent = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<List />} />
      <Route path="/erro" element={<Error />} />
    </Routes>
  </div>
);

export default Rotes;
