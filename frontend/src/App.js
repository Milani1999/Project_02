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
import News from "./components/Administrator/pages/News";
import Notices from "./components/Administrator/pages/Notices";
import SignIn from "./view/Signin/SignIn";
import Auth from "./view/Signin/ProtectedRoute";
import Performance from "./components/Teacher/Pages/Performance";
import TeacherDashboard from "./components/Teacher/Pages/TeacherDashboard";
import TeacherProfile from "./components/Teacher/Pages/Profile";
import TAttendence from "./components/Teacher/Pages/TAttendence";
import TMarks from "./components/Teacher/Pages/TMarks";
import TNotices from "./components/Teacher/Pages/TNotices";
import VStudents from "./components/Teacher/Pages/VStudents";
import TeacherMainlayout from "./components/Teacher/Main/TeacherMainlayout";
import TCalendar from "./components/Teacher/Pages/TCalendar";
import TTimetable from "./components/Teacher/Pages/TTimetable";
import StudentMain from "./components/Student/StudentMain/StudentMain";
import ProfilePage from "./components/Student/Pages/ProfilePage";
import TimeTable from "./components/Student/Pages/TimeTable";
import Support from "./components/Administrator/pages/Support";
import Marks from "./components/Student/Pages/Student_marks";
import TClassMarks from "./components/Teacher/Pages/TClassMarks";
import SNotices from "./components/Student/Pages/SNotices";
import StaffAttendance from "./components/Administrator/pages/StaffAttendance";
import StudentAttendance from "./components/Administrator/pages/StudentAttendance";
import ViewStudentAttendance from "./components/Student/Pages/ViewStudentAttendance";
import Gallery from "./components/section/Gallery";
import EditGallery from "./components/Administrator/pages/EditGallery";
import LeavingCertificate from "./components/Administrator/pages/LeavingCertificate";
import Payment from "./components/Student/Pages/Payment";
import ResetPassword from "./components/signInFormComponent/ResetPassword";
import ChangePassword from "./components/signInFormComponent/ChangePwd";


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
          <Route path="/Gallery" element={<Gallery />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          ></Route>

          <Route
            path="/Teacher"
            element={
              <Auth expectedRoles={["staff"]}>
                {" "}
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
            <Route path="TClassMarks" element={<TClassMarks />} />
            <Route path="Performance" element={<Performance />} />
            <Route path="change-password" element={<ChangePassword />} />
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
            <Route path="News" element={<News />} />
            <Route path="Notices" element={<Notices />} />
            <Route path="Performance" element={<Performance />} />
            <Route path="Support" element={<Support />} />
            <Route path="StaffAttendance" element={<StaffAttendance />} />
            <Route path="StudentAttendance" element={<StudentAttendance />} />
            <Route path="EditGallery" element={<EditGallery />} />
            <Route path="LeavingCertificate" element={<LeavingCertificate />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route
            path="/Student"
            element={
              <Auth expectedRoles={["student"]}>
                <StudentMain />
              </Auth>
            }
          >

            <Route path="ProfilePage" element={<ProfilePage />} />
            <Route path="TimeTable" element={<TimeTable />} />
            <Route path="Marks" element={<Marks />} />
            <Route
              path="ViewStudentAttendance"
              element={<ViewStudentAttendance />}
            />
            <Route path="Payment" element={<Payment />} />
            <Route path="ViewNotice" element={<SNotices />} />
            <Route path="Scalender" element={<TCalendar />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
        <FooterRoutes />
      </div>
    </Router>
  );
}
const includedPaths = [
  "/",
  "/About",
  "/School",
  "/Events",
  "/Contact",
  "/Students",
  "/Gallery",
];

function HeaderRoutes() {
  const location = useLocation();
  const excludeHeader = includedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <React.Fragment>{excludeHeader && <Navbar />}</React.Fragment>;
}

function FooterRoutes() {
  const location = useLocation();
  const excludeFooter = includedPaths.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <React.Fragment>{excludeFooter && <Footer />}</React.Fragment>;
}

export default App;
