import React from 'react';
import './App.css';
import LoginPage from './LoginPage';
import ProfileListing from './profileListing';
import ProfileDetail from './profileDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    //Setting up the routing logic for the events in the application using react-router-dom.
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profileListing" element={<ProfileListing />} />
          <Route path="/profileDetail/:_id" element={<ProfileDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
