const pool = require('../config/db');
const { getCachedData } = require('../services/cacheService');

const Student = {
  getAll: async (callback) => {
    try {
      const res = await pool.query('SELECT * FROM students');
      callback(null, res.rows);
    } catch (err) {
      callback(err, null);
    }
  },
  getById: async (id, callback) => {
    try {
      const res = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
      callback(null, res.rows[0]);
    } catch (err) {
      callback(err, null);
    }
  },
  create: async (data, callback) => {
    const { name, age } = data;
    try {
      const res = await pool.query(
        'INSERT INTO students (name, age) VALUES ($1, $2) RETURNING *',
        [name, age]
      );
      await redis.del('all_students');
      callback(null, res.rows[0]);
    } catch (err) {
      callback(err, null);
    }
  },
  update: async (id, data, callback) => {
    const { name, age } = data;
    try {
      await pool.query(
        'UPDATE students SET name = $1, age = $2 WHERE id = $3',
        [name, age, id]
      );
      await redis.del('all_students');
      await redis.del(`student_${id}`);
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      await pool.query('DELETE FROM students WHERE id = $1', [id]);
      await redis.del('all_students');
      await redis.del(`student_${id}`);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Student;
