import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";
import Ceo from './pages/about/ceo.js';
import Company from './pages/about/company.js';
import History from './pages/about/history.js';
import Conduct from './pages/about/conduct.js';
import Location from './pages/about/location.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about/ceo" element={<Ceo />}></Route>
        <Route path="/about/company" element={<Company />}></Route>
        <Route path="/about/history" element={<History />}></Route>
        <Route path="/about/conduct" element={<Conduct />}></Route>
        <Route path="/about/location" element={<Location />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
