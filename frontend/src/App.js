import React from 'react';
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
import MainLayout from './components/Administrator/Main/Mainlayout';
import Dashboard from './components/Administrator/pages/Dashboard';
import TeacherList  from './components/Administrator/pages/TeacherList';
import EditTeacher from './components/Administrator/pages/EditTeacher';
import AddStudent from './components/Administrator/pages/AddStudent';
import Subject from './components/Administrator/pages/Subject';
import './assets/Style/styles.css'
import Calender from './components/Administrator/pages/Calender';

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
          <Route path="/administrator" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="TeacherList" element={<TeacherList />}/>
            <Route path="editTeacher" element={<EditTeacher />}/>
            <Route path="AddStudent" element={<AddStudent />}/>
            <Route path="Subject" element={<Subject />}/>
            <Route path="calender" element={<Calender />}/>
         </Route>
        </Routes>
        <FooterRoutes />
      </div>
    </Router>
  );
}
const excludedPaths = ["/administrator"];

function HeaderRoutes() {
  const location = useLocation();
  const excludeHeader = excludedPaths.includes(location.pathname);
  return (
    <React.Fragment>
      {!excludeHeader && <Navbar />}
    </React.Fragment>
  );
}

function FooterRoutes() {
  const location = useLocation();
  const excludeFooter = excludedPaths.includes(location.pathname);
  return (
    <React.Fragment>
      {!excludeFooter && <Footer />}
    </React.Fragment>
  );
}










export default App;