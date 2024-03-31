// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import LoginPage from './components/LoginPage';
import LandDetailsPage from './components/LandDetailsPage';
import AddLandPage from './components/AddLandPage';

function App() {
  return (
    <Router>
      <div class ="main">
        <nav class ="main1">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/lands" element={<LandDetailsPage />} />
          <Route path="/add-land" element={<AddLandPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
