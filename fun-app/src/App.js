import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';

function App() {


  return (
    <div>
      <Router>
        <NavBar  />
        <Routes>
          <Route path="/" element={<News key="general" pagesize={10} country="in" category="general" />} />
          <Route path="/business" element={<News key="business" pagesize={10} country="in" category="business" />} />
          <Route path="/entertainment" element={<News key="entertainment" pagesize={10} country="in" category="entertainment" />} />
          <Route path="/general" element={<News key="general" pagesize={10} country="in" category="general" />} />
          <Route path="/health" element={<News key="health" pagesize={10} country="in" category="health" />} />
          <Route path="/science" element={<News key="science" pagesize={10} country="in" category="science" />} />
          <Route path="/sports" element={<News key="sports" pagesize={10} country="in" category="sports" />} />
          <Route path="/technology" element={<News key="technology" pagesize={10} country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
