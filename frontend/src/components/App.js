import React from "react";
import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Header from "./header";
import School from "./pages/OurSchool";
import Footer from "./footer";

import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <AboutUs/>
      <School/>
      <Footer/>
    </div>
  );
}

export default App;
