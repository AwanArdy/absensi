import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";

const useScanner = (onScanSuccess, onScanFailure) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

  const startScanner = () => {
    setIsScanning(true);
    setError(null);

    if (!scannerRef.current) {
      const qrRegionId = "qr-reader";
      scannerRef.current = new Html5Qrcode(qrRegionId);
    }

    scannerRef.current.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText) => {
        onScanSuccess(decodedText);
        stopScanner();
      },
      (errorMessage) => {
        if (onScanFailure) onScanFailure(errorMessage);
      }
    ).catch((err) => {
      console.error("Error starting scanner:", err);
      setError("Gagal memulai scanner");
      setIsScanning(false);
    });
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        setIsScanning(false);
      }).catcn((err) => {
        console.error("Error stopping scanner:", err);
        setError("Gagal menghentikan scanner");
      });
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => { /* error handle */ });
      }
    };
  }, []);

  return {
    isScanning,
    startScanner,
    stopScanner,
    error
  };
};

export default useScanner;
