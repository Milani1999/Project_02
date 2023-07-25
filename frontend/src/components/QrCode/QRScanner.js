import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  // const [data, setData] = useState("Ready to Scan");
  const [isScanning, setIsScanning] = useState(false);
  const qrRef = useRef(null);

  const handleScan = async (content) => {
    
    // Check if the scanner is running to avoid multiple scans
    if (isScanning && content) {
      setIsScanning(false); // Pause the scanner to prevent further scans

      try {
        // Handle QR code scan result (content) here
        // Call the backend API to mark the attendance based on the user ID obtained from the QR code
        await markAttendance(content);

        // Display "Welcome" message on successful attendance recording
        alert("Welcome");
      } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Error marking attendance. Please try again.");
      } finally {
        setIsScanning(true); // Resume the scanner to allow the next scan
      }
    }
  };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const markAttendance = async (userId) => {
    try {
      // Call the backend API to mark the attendance based on the user ID obtained from the QR code
      const response = await fetch("/api/attendance/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error marking attendance:", error);
      throw error;
    }
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="container mx-auto mt-2">
      <button onClick={startScanning}>Take Attendance</button>
      <button onClick={stopScanning}>Stop Scanning</button>
      {/* {isScanning && (
        <QrReader
          ref={qrRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', height: '100%' }}
        />
      )} */}
      <div className="row">
      <div className="card col-sm-6">
      <div className="card-body text-center">
      {isScanning && (
        <QrReader
          className="frame-size"
          ref={qrRef}
          delay={300}
          onError={handleError}
          // onScan={handleScan(data)}
          onResult={(result, error) => {
            if (!!result) {
              
              const data = (result?.text);
              handleScan(data);
              
            }

            if (!!error) {
              console.info(error);
            }
          }}
        /> 
        )}
      </div>

      <div className="card-footer text-center rounded m-2">
        {/* <h4>{data}</h4> */}
      </div>
      </div>
    </div>
    </div>
  );
};

export default QRScanner;
