import React from "react";
import Navbar from "./components/header";
import Home from "./components/pages/home";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminUI from "./components/Admin/AdminUI";
import LandingPage from "./components/pages/landinPage";
import AboutUs from "./components/pages/aboutus";
import School from "./components/pages/OurSchool";
import ContactUs from "./components/pages/ContactUs";
import Events from "./components/pages/Events";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Home/>} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/School" element={<School />} />
        <Route path="/Events" element={<Events/>} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Administrator" element={<AdminUI/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
