import React from "react";
import Home from "../../components/section/home";
import AboutUs from "../../components/section/aboutus";
import School from "../../components/section/OurSchool";
import ContactUs from "../../components/section/ContactUs";
import Events from "../Events/Events";
import Gallery from "../../components/section/Gallery";


function LandingPage() {
    return (
        <div>
            <Home />
            <AboutUs />
            <School />
            <Events />
            <Gallery/>
            <ContactUs />
        </div>
    );
}

export default LandingPage;
