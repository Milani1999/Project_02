import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import Popup from "reactjs-popup";
import "./QrScanner.css";

const StaffQRScanner = (props) => {
  const { fetchStaffAttendance } = props;
  const [isScanning, setIsScanning] = useState(false);
  const qrRef = useRef(null);
  const [message, setMessage] = useState("Ready to Scan");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const openQrScanner = () => {
    setIsScanning(true);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setMessage("Ready to Scan");
    setIsScanning(false);
    setShowDeletePopup(false);
  };

  const handleScan = async (content) => {
    if (isScanning && content) {
      setIsScanning(false);
      setMessage("Scanning");

      try {
        await markAttendance(content);
        fetchStaffAttendance();
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

  const markAttendance = async (emp_id) => {
    try {
      const response = await fetch("/api/staffattendance/take", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id: emp_id }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error marking attendance:", error);
      throw error;
    }
  };

  return (
    <div>
      <div style={{ float: "right" }}>
        <Button onClick={openQrScanner}>
          {isScanning ? "Stop Scanning" : "Take Attendance"}
        </Button>
      </div>

      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background">
          <div className="popup-container-delete">
            <h3>QR Scanner</h3>
            <div className="">
              <div className="">
                <div className="card col-sm-12">
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
                          }

                          if (!!error) {
                            console.info(error);
                          }
                        }}
                      />
                    )}
                  </div>

                  <div className="card-footer text-center rounded m-2">
                    <h3
                      style={{
                        color: message.startsWith("Welcome")
                          ? "green"
                          : message === "Ready to Scan"
                          ? "blue"
                          : "red",
                      }}
                    >
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={handleCloseDeletePopup}
              className="mx-2 mt-3"
            >
              Close
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default StaffQRScanner;
