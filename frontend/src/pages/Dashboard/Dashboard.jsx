import React, { useState } from "react";
import QRCodeScanner from '../../components/QRCodeScanner';

const Dashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleScanResult = (decodedText) => {
    const newRecord = {
      id: attendanceRecords.length + 1,
      studentId: decodedText,
      timestamp: new Date().toLocaleString(),
      status: 'Masuk',
    };
    setAttendanceRecords([newRecord, ...attendanceRecords]);
    setMessage(`Absensi berhasil untuk ID siswa: ${decodedText}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Absensi Siswa</h1>
      <div className="scanner-section">
        <QRCodeScanner onScanResult={handleScanResult} />
        {message && <p className="success-message">{message}</p>}
      </div>
      <div className="attendance-records">
        <h2>Rekap Absensi</h2>
        {attendanceRecords.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Siswa</th>
                <th>Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.studentId}</td>
                  <td>{record.timestamp}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-records">Belum ada data absensi.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
