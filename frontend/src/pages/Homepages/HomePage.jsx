import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePages / HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="hompage-title">Selamat datang di sistem absensi sekolah</h1>
      <p className="homepage-subtitle">Kelola kehadiran siswa dengan mudah dan efisien</p>

      <div className='homepage-links'>
        <Link to="/scanner" className="homepage-link">
          <div className='link-card'>
            <h2>Absensi Siswa</h2>
            <p>Pindai QR code untuk melakukan absensi</p>
          </div>
        </Link>

        <Link to="/reports" className="homepage-link">
          <div className='link-card'>
            <h2>Laporan kehadiran</h2>
            <p>Lihat rekap absensi harian, mingguan dan bulanan</p>
          </div>
        </Link>

        <Link to="/manage-students" className="homepage-link">
          <div className='link-card'>
            <h2>Data Siswa</h2>
            <p>Kelola data siswa, termasuk penambahan dan pembaruan informasi</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
