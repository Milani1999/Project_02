import React from "react";
import Home from "../../components/section/home";
import AboutUs from "../../components/section/aboutus";
import School from "../../components/section/OurSchool";
import ContactUs from "../../components/section/ContactUs";
import Events from "../Events/Events";


function LandingPage() {
    return (
        <div>
            <Home />
            <AboutUs />
            <School />
            <Events />
            <ContactUs />
        </div>
    );
}

export default LandingPage;
