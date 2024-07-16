import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import MapComponent from './components/MapComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
