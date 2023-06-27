import React from "react";
import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Header from "./header";
import School from "./pages/OurSchool";

function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <AboutUs/>
      <School/>
    </div>
  );
}

export default App;
