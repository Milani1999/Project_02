const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const markRoutes = require("./routes/markRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const studentAttendanceRoutes = require("./routes/studentAttendanceRoutes");
const noticesRoutes = require("./routes/noticesRoutes");
const eventRoutes = require("./routes/eventRoutes");
const newsRoutes = require("./routes/newsRoutes");
const timeTableRoute = require("./routes/timeTableRoute");
const ImageRoutes = require("./routes/ImageRoutes");
const oldStudentRoutes = require("./routes/oldStudentRoutes");
const staffAttendanceRoutes = require("./routes/staffAttendanceRoutes");
const reliefRoutes = require("./routes/reliefRoutes");
const oldStaffRoutes = require("./routes/oldStaffRoutes");
const staffNotices = require("./routes/sendnoticesRoutes");

const paymentRoutes = require("./routes/paymentRoutes"); 
const cors = require('cors');
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running in PORT ....");
});

app.use("/api/users", userRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/staff", staffRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/marks", markRoutes);

app.use("/api/grades", gradeRoutes);

app.use("/api/studentattendance", studentAttendanceRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/timetable", timeTableRoute);
app.use("/api/gallery", ImageRoutes);
app.use("/api/oldStudents", oldStudentRoutes);
app.use("/api/staffattendance", staffAttendanceRoutes);
app.use("/api/reliefAllocation", reliefRoutes);
app.use("/api/oldStaff", oldStaffRoutes);
app.use("/api/staffNotices", staffNotices);
app.use("/api/payment", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
