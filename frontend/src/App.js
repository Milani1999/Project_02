import React,{useEffect} from 'react';
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
import EditTeacher from './components/Administrator/pages/EditTeacher';
import EditStudent from './components/Administrator/pages/EditStudent';
import Subject from './components/Administrator/pages/Subject';
import './assets/Style/styles.css'
import Calender from './components/Administrator/pages/Calender';
import Timetable from './components/Administrator/pages/Timetable';
import Attendence from './components/Administrator/pages/Attendence';
import Grade from './components/Administrator/pages/Grade';
import Notices from './components/Administrator/pages/Notices';
import ViewStaff from './components/Administrator/CRUD/staff/ViewStaff';
import ViewStudents from './components/Administrator/CRUD/users/StudentList';
import Marks from './components/Administrator/CRUD/marks/Marks';

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


          <Route path="marks" element={<Marks/>}/>
          <Route path="/viewstaff" element={<ViewStaff/>}/>
          <Route path="/viewstudents" element={<ViewStudents/>}/>


          <Route path="/administrator" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
       
            <Route path="EditTeacher" element={<EditTeacher />} />
            <Route path="EditStudent" element={<EditStudent />} />
            
            <Route path="Subject" element={<Subject />} />
            <Route path="calender" element={<Calender />} />
            <Route path="Timetable" element={<Timetable />} />
            <Route path="Attendence" element={<Attendence />} />
            <Route path="Grade" element={<Grade />} />
            <Route path="Notices" element={<Notices />} />
          </Route>
        </Routes>
        <FooterRoutes />
      </div>
    </Router>
  );
}

const excludedPaths = ["/administrator", "/login", "/viewstudents","/viewstudents/create","/subjects"
,"/addstudents","/addstaff","/viewstaff","/marks","/administrator/EditTeacher","/administrator/EditStudent","/administrator/Timetable" ];
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
