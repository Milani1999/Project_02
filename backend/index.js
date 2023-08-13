const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require('./routes/userRoutes');
const staffRoutes = require('./routes/staffRoutes');
const markRoutes=require('./routes/markRoutes')
const gradeRoutes=require('./routes/gradeROutes')
const subjectRoutes=require('./routes/subjectRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const attendanceRoutes = require("./routes/attendanceRoutes");


const app = express();
dotenv.config();
connectDB();


app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running in PORT ....");
})

app.use('/api/users', userRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/staff", staffRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/marks", markRoutes);

app.use("/api/grades", gradeRoutes);

app.use("/api/attendance", attendanceRoutes);
app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

