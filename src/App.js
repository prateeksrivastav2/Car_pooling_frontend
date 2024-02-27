import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<>This is home page</>} />
            <Route exact path="/home" element={<>This is second home page</>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
