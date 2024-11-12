const Student = require("../models/Student");
const { getCachedData } = require("../services/cacheService");

async function getStudents(req, res) {
  try {
    const students = await getCachedData('all_students', Student);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving students" });
  }
}

module.exports = { getStudents };
