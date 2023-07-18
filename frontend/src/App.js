import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Header/header';
import Footer from './components/Footer/footer';
import LandingPage from "./view/LandingPage/landinPage";
import AboutUs from "./components/section/aboutus";
import School from "./components/section/OurSchool";
import ContactUs from "./components/section/ContactUs";
import Events from "./components/section/Events";
import Home from "./components/section/home";
import StudentDetails from './components/Student/student_details';
import AdminApp from "./components/Admin/AdminApp"
import './assets/Style/styles.css'


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
          <Route path="/Students" element={<StudentDetails />} />
          <Route path="/administrator" element={<AdminApp />} />
        </Routes>
        <FooterRoutes />
      </div>
    </Router>
  );
}

const excludedPaths = ["/administrator", "/login", "/viewstudents","/viewstudents/create","/subjects"
,"/addstudents","/addstaff","/viewstaff","/marks" ];
function HeaderRoutes() {
  const location = useLocation();
  const excludeHeader = excludedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      {!excludeHeader && <Navbar />}
    </React.Fragment>
  );
}

function FooterRoutes() {
  const location = useLocation();
  const excludeFooter = excludedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      {!excludeFooter && <Footer />}
    </React.Fragment>
  );
}

export default App;
