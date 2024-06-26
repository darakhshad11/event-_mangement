import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import VendorPage from './components/VendorPage.jsx';
import UserPage from './components/UserPage.jsx';
import SignUp from './components/Signup';
import Navbar from './components/Navbar.jsx';
import AdminPage from './components/AdminPage.jsx';
import MaintainUser from './components/MaintainUser.jsx';
import MaintainVendor from './components/MaintainVendor.jsx';
import Cart from './components/Cart.jsx'



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/vendor-page" element={<VendorPage />} />
          <Route exact path="/user-page" element={<UserPage />} />
          <Route exact path="/admin-page" element={<AdminPage />} />
          <Route path="/maintain-vendor" element={<MaintainVendor/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/maintain-user" element={<MaintainUser/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
