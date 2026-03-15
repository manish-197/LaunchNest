import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";

// Import Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// Global CSS
import "./index.css";
import Listing from "./pages/Listing";
import Details from "./pages/Details";
import Create from "./pages/Create";
import Footer from "./components/Footer";
import UpdateProfile from './components/UpdateProfile';
import UpdateStartup from "./components/UpdateStartup";


function App() {
  const { isLoggedIn } = useAuth();


  
  return (
      <Router>
        <div className="app-wrapper">
          {/* {isLoggedIn ? <Navbar onLogout={handleLogout} />: ""} */}
          <Navbar />

          {/* Page Content */}
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/startups" element={isLoggedIn ? <Listing /> : <Navigate to="/signin" />} />
              <Route path="/update-profile" element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/signin" />} />
              <Route path="/startup/:id" element={isLoggedIn ? <Details /> : <Navigate to="/signin" />} />
              <Route path="/update/:id" element={isLoggedIn ? <UpdateStartup /> : <Navigate to="/signin" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
              
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route
                path="/create"
                element={<Create />}
              />
            </Routes>
          </main>
          {/* {isLoggedIn ? <Footer /> : "" } */}
          <Footer />

          {/* Optional: Footer can be added here */}
        </div>
      </Router>
  );
}

export default App;
