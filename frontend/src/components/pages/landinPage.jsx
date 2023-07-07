import React from "react";
import Home from "./home";
import AboutUs from "./aboutus";
import School from "./OurSchool";
import ContactUs from "./ContactUs";
import Events from "./Events";


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
