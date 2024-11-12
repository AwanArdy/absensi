const express = require("express");
const { default: rateLimit } = require("express-rate-limit");
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const attendanceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Terlalu banyak permintaan, coba lagi nanti"
});

app.use('/api/attendance', attendanceLimiter);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;
