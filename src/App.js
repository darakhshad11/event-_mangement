import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import VendorPage from './components/VendorPage.jsx';
import UserPage from './components/UserPage.jsx';
import SignUp from './components/Signup.js';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/vendor-page" element={<VendorPage />} />
          <Route exact path="/user-page" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
