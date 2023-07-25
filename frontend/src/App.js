import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Header/header";
import Footer from "./components/Footer/footer";
import LandingPage from "./view/LandingPage/landinPage";
import AboutUs from "./components/section/aboutus";
import School from "./components/section/OurSchool";
import ContactUs from "./components/section/ContactUs";
import Events from "./view/Events/Events";
import Home from "./components/section/home";
import StudentDetails from "./components/Student/student_details";
import MainLayout from "./components/Administrator/Main/Mainlayout";
import Dashboard from "./components/Administrator/pages/Dashboard";
import EditTeacher from "./components/Administrator/pages/EditTeacher";
import EditStudent from "./components/Administrator/pages/EditStudent";
import Subject from "./components/Administrator/pages/Subject";
import "./assets/Style/styles.css";
import Calender from "./components/Administrator/pages/Calender";
import Timetable from "./components/Administrator/pages/Timetable";
import Attendence from "./components/Administrator/pages/Attendence";
import Grade from "./components/Administrator/pages/Grade";
import Notices from "./components/Administrator/pages/Notices";
import SignIn from "./view/Signin/SignIn";
import Auth from "./view/Signin/ProtectedRoute";
import Performance from "./components/Administrator/pages/Performance";
import TeacherDashboard from "./components/Teacher/Pages/TeacherDashboard";
import TeacherProfile from "./components/Teacher/Pages/Profile";
import TAttendence from "./components/Teacher/Pages/TAttendence";
import TMarks from "./components/Teacher/Pages/TMarks";
import TNotices from "./components/Teacher/Pages/TNotices";
import VStudents from "./components/Teacher/Pages/VStudents";
import TeacherMainlayout from "./components/Teacher/Main/TeacherMainlayout";
import TCalendar from "./components/Teacher/Pages/TCalendar";
import TTimetable from "./components/Teacher/Pages/TTimetable";

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
          <Route path="/login" element={<SignIn />} />

          {/* <Route
            path="/viewstaff"
            element={
              <Auth expectedRoles={["staff"]}>
                <ViewStaff />
              </Auth>
            }
          />

          <Route
            path="/viewstudents"
            element={
              <Auth expectedRoles={["student"]}>
                <ViewStudents />
              </Auth>
            }
          /> */}

          <Route
            path="/Teacher"
            element={
              <Auth expectedRoles={["staff"]}>
                <TeacherMainlayout />
              </Auth>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="Profile" element={<TeacherProfile />} />
            <Route path="TAttendence" element={<TAttendence />} />
            <Route path="TTimetable" element={<TTimetable />} />
            <Route path="TMarks" element={<TMarks />} />
            <Route path="TNotices" element={<TNotices />} />
            <Route path="VStudents" element={<VStudents />} />
            <Route path="TCalendar" element={<TCalendar />} />
          </Route>
          <Route
            path="/administrator"
            element={
              <Auth expectedRoles={["admin"]}>
                <MainLayout />
              </Auth>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="EditTeacher" element={<EditTeacher />} />
            <Route path="EditStudent" element={<EditStudent />} />

            <Route path="Subject" element={<Subject />} />
            <Route path="calender" element={<Calender />} />
            <Route path="Timetable" element={<Timetable />} />
            <Route path="Attendence" element={<Attendence />} />
            <Route path="Grade" element={<Grade />} />
            <Route path="Notices" element={<Notices />} />
            <Route path="Performance" element={<Performance />} />
          </Route>
        </Routes>
        <FooterRoutes />
      </div>
    </Router>
  );
}

const excludedPaths = [
  "/administrator",
  "/Login",
  "/viewstudents",
  "/viewstudents/create",
  "/subjects",
  "/addstudents",
  "/addstaff",
  "/viewstaff",
  "/administrator/EditTeacher",
  "/administrator/EditStudent",
  "/administrator/Timetable",
  "/administrator/Subject",
  "/administrator/Grade",
  "/administrator/Attendence",
  "/Teacher",
  "/Teacher/TNotices",
  "/Teacher/TCalendar",
  "/Teacher/TTimetable",
  "/Teacher/Profile",
  "/Teacher/TAttendence",
  "/Teacher/VStudents",
  "/Teacher/TMarks",
  
];

function HeaderRoutes() {
  const location = useLocation();
  const excludeHeader = excludedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <React.Fragment>{!excludeHeader && <Navbar />}</React.Fragment>;
}

function FooterRoutes() {
  const location = useLocation();
  const excludeFooter = excludedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <React.Fragment>{!excludeFooter && <Footer />}</React.Fragment>;
}

export default App;
