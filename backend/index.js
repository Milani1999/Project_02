const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const students = require('./data/students')
const studentRoutes=require("./routes/studentRoutes");

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send("API is running in PORT ....");
})

// app.get('/api/students', (req, res) => {
//   res.json(students);
// })

// app.get('/api/students/:id', (req, res) => {
//   const student = students.find((n) => n.id === req.params.id);
//   res.json(student);
// });

app.use("/api/students",studentRoutes);


app.listen(5000, () => {
  console.log("Server started on port 5000");
});

