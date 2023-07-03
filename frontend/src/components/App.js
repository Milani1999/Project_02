import React from "react";
import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Header from "./header";
import School from "./pages/OurSchool";
import ContactUs from "./pages/ContactUs";
import Events from "./pages/Events";

function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <AboutUs/>
      <School/>
      <Events/>
      <ContactUs/>
    </div>
  );
}

export default App;
