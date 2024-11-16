import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepages/HomePage';
import Reports from './pages/Reports/Reports';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanner" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
