import React, { useState, useRef } from "react";
import {Button } from "react-bootstrap";
import { QrReader } from "react-qr-reader";

const QRScanner = (props) => {
  const { fetchStudentAttendance } = props;
  const [isScanning, setIsScanning] = useState(false);
  const qrRef = useRef(null);

  const handleScan = async (content) => {
    if (isScanning && content) {
      setIsScanning(false);

      try {
        await markAttendance(content);
        fetchStudentAttendance();
      } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Error marking attendance. Please try again.");
      } finally {
        setIsScanning(true);
      }
    }
  };

  const handleError = (error) => {
    console.error("Error while scanning:", error);
  };

  const markAttendance = async (admissionNo) => {
    try {
      const response = await fetch("/api/attendance/take", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admission_no: admissionNo }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error marking attendance:", error);
      throw error;
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  return (
    <div className="container mx-auto mt-2">
      <Button onClick={toggleScanning}>
        {isScanning ? "Stop Scanning" : "Take Attendance"}
      </Button>

      <div className="row">
        <div className="card col-sm-6">
          <div className="card-body text-center">
            {isScanning && (
              <QrReader
                className="frame-size"
                ref={qrRef}
                delay={300}
                onError={handleError}
                onResult={(result, error) => {
                  if (!!result) {
                    const data = result?.text;
                    handleScan(data);
                    console.log(data);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
              />
            )}
          </div>

          <div className="card-footer text-center rounded m-2"></div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
