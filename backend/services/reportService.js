const redis = require("../config/cache");
const pool = require("../config/db");
const { getCachedData } = require("./cacheService");

const ReportService = {
  getDailyReport: async (data) => {
    const cacheKey = `daily_report_${date}`;

    return getCachedData(cacheKey, async () => {
      const query = `
        SELECT students.id, students.name, attendance.status, attendance.date, attendance.time
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE attendance.date = $1
      `;
      const result = await pool.query(query, [date]);
      return result.rows;
    });
  },

  getWeeklyReport: async (startDate, endDate) => {
    const cacheKey = `weekly_report_${startDate}_${endDate}`;

    return getCachedData(cacheKey, async () => {
      const query = `
        SELECT students.id, students.name, COUNT(attendance.id) AS attendance_count
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE attendance.date BETWEEN $1 AND $2
        GROUP BY students.id, students.name
      `;
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows;
    });
  },
  getMonthlyReport: async (month, year) => {
    const cacheKey = `monthly_report_${year}_${month}`;

    return getCachedData(cacheKey, async () => {
      const query = `
        SELECT students.id, students.name, COUNT(attendance.id) AS attendance_count
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE EXTRACT(MONTH FROM attendance.date) = $1
          AND EXTRACT(YEAR FROM attendance.date) = $2
        GROUP BY students.id, students.name
      `;
      const result = await pool.query(query, [month, year]);
      return result.rows;
    });
  },
  generateWeeklyReport: async () => {
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
    const cacheKey = `weekly_report_${startDate}_${endDate}`;
    const weeklyReport = await ReportService.getWeeklyReport(startDate, endDate);

    await redis.set(cacheKey, JSON.stringify(weeklyReport), 'EX', 86400);
    console.log("Weekly report generated and cached");
  }
};

module.exports = ReportService;
