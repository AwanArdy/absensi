// src/components/QRCodeScanner.jsx
import React from 'react';
import useScanner from '../hooks/useScanner';

const QRCodeScanner = ({ onScanResult }) => {
  const { isScanning, startScanner, stopScanner, error } = useScanner(
    onScanResult,
    (errorMessage) => console.warn("Scan failed:", errorMessage)
  );

  return (
    <div>
      <div id="qr-reader" style={{ width: "300px", height: "300px" }}></div>

      {isScanning ? (
        <button onClick={stopScanner}>Stop Scanning</button>
      ) : (
        <button onClick={startScanner}>Start Scanning</button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
