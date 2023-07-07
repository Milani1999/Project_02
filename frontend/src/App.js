// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/header';
import Footer from './components/footer';
import Menu from "./components/Admin/Menu";
import LandingPage from "./components/pages/landinPage";
import AboutUs from "./components/pages/aboutus";
import School from "./components/pages/OurSchool";
import ContactUs from "./components/pages/ContactUs";
import Events from "./components/pages/Events";
import Home from "./components/pages/home";

function App() {
  return (
    <Router>
      <div>
        <HeaderRoutes />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/School" element={<School />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/Administrator" element={<Menu />} />
        </Routes>
        <FooterRoutes/>
      </div>
    </Router>
  );
}

function HeaderRoutes() {
  const location = useLocation();
  const excludeHeader = location.pathname === '/Administrator';

  return (
    <React.Fragment>
      {!excludeHeader && (
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function FooterRoutes() {
  const location = useLocation();
  const excludeFooter = location.pathname === '/Administrator';

  return (
    <React.Fragment>
      {!excludeFooter && (
        <React.Fragment>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
