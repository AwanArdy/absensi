import React, { useState, useEffect } from "react";
import '../Reports/Reports.css';

const Reports = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filter, setFilter] = useState('daily');

  useEffect(() => {
    const sampleData = [
      { id: 1, studentId: '001', date: '2024-11-05', time: '07:15 AM', status: 'Masuk' },
      { id: 2, studentId: '002', date: '2024-11-05', time: '07:20 AM', status: 'Masuk' },
    ];
    setAttendanceRecords(sampleData);
  }, []);

  useEffect(() => {
    const now = new Date();
    const filtered = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      if (filter === 'daily') {
        return (
          recordDate.toDateString() === now.toDateString()
        );
      } else if (filter === 'weekly') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return recordDate >= weekAgo && recordDate <= now;
      } else if (filter === 'monthly') {
        return (
          recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
    setFilteredRecords(filtered);
  }, [filter, attendanceRecords]);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Laporan Kehadiran Siswa</h1>
      <div classname="filter-section">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.targe.value)}>
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
          <option value="weekly">Bulanan</option>
        </select>
      </div>
      <div className="report-table-section">
        {filteredRecords.length > 0 ? (
        <thead>
              <tr>ID</tr>
              <tr>ID Siswa</tr>
              <tr>Tanggal</tr>
              <tr>Waktu</tr>
              <tr>Status</tr>
        </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.studentId}</td>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="no-records">Tidak ada data absensi untuk rentang waktu ini</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
