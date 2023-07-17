import React from "react";
import Header from "../../components/Header/header"
import Home from "../../components/Section/home";
import AboutUs from "../../components/Section/aboutus";
import School from "../../components/Section/OurSchool";
import ContactUs from "../../components/Section/ContactUs";
import Events from "../Events/Events";
import Footer from "../../components/Footer/footer";

function LandingPage() {
    return (
        <div>
            <Header/>
            <Home />
            <AboutUs />
            <School/>
            <Events/>
            <ContactUs />
            <Footer/>
        </div>
    );
}

export default LandingPage;
