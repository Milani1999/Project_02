import React from "react";
import Navbar from "./components/Header/header";
import Home from "./components/Section/home";
import Footer from "./components/Footer/footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminUI from "./components/Admin/AdminUI";
import AboutUs from "./components/Section/aboutus";
import School from "./components/Section/OurSchool";
import ContactUs from "./components/Section/ContactUs";
import Events from "./View/Events/Events";
import LandingPage from "./View/LandingPage/landinPage";
import SignIn from "./View/Signin/SignIn";


function App() {
    return (
        <Router>
            {/* <Navbar />
            <ScrollToTop /> */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<AboutUs />} />
                <Route path="/School" element={<School />} />
                <Route path="/Events" element={<Events />} />
                <Route path="/Contact" element={<ContactUs />} />
                <Route path="/Administrator" element={<AdminUI />} />
                <Route path="/signIn" element={<SignIn />} />
            </Routes>
            {/* <Footer /> */}
        </Router>
    );
};

export default App;
