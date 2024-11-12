const pool = require("../config/db");

const Attendance = {
  markAttendance: async (data, callback) => {
    const { student_id, date } = data;
    try {
      await pool.query(
        'INSERT INTO attendance (student_id, date) VALUES($1, $2)',
        [student_id, date]
      );
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  getAttendanceByDate: async (date, callback) => {
    try {
      const res = await pool.query('SELECT * FROM attendance WHERE date = $1', [date]);
      callback(null, res.rows);
    } catch (err) {
      callback(err, null);
    }
  },
  getReport: async (callback) => {
    try {
      const res = await pool.query(
        'SELECT student_id, COUNT(*) as total FROM attendance GROUP BY student_id'
      );
      callback(null, res.rows);
    } catch (err) {
      callback(err, null);
    }
  }
};

module.exports = Attendance;
