import React, { useState, useRef } from "react";
import qrcode from "qrcode";

function QrGenerator(props) {
  const { userID } = props;
  const qrCodeRef = useRef(null);

  const [imageQR, setImageQR] = useState();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await generateQRDataURL(userID);
      setImageQR(qrDataUrl);
      setIsButtonClicked(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const generateQRDataURL = async (data) => {
    const options = {
      type: "image/png", // Generate PNG format
      quality: 0.92, // Can Adjust quality (0.0 to 1.0)
      margin: 1,
      width: 200,
      errorCorrectionLevel: "M", // L, M, Q, H
    };

    return new Promise((resolve, reject) => {
      qrcode.toDataURL(data, options, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };

  const handleDownload = () => {
    if (imageQR) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Set canvas dimensions
      canvas.width = 250; // Adjust width
      canvas.height = 300; // Adjust height
  
      // Draw UserId above the QR code
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(userID, canvas.width / 2, 15);
  
      // Draw QR code image
      const qrImage = new Image();
      qrImage.src = imageQR;
      qrImage.onload = () => {
        ctx.drawImage(qrImage, 0, 30, canvas.width, canvas.height - 70);
  
        // Draw text below the QR code
        ctx.font = "14px Arial";
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("Universal International School", canvas.width / 2, canvas.height - 25);
  
        // Create a data URL from the canvas
        const imgData = canvas.toDataURL("image/png");
  
        // Trigger download
        const link = document.createElement("a");
        link.download = "QR_"+ userID+".png";
        link.href = imgData;
        link.click();
      };
    }
  };
  
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {imageQR && (
          <div ref={qrCodeRef}>
            <img
              src={imageQR}
              alt="qr_code"
              width="100"
              height="100"
              style={{ border: "2px solid black", borderRadius: "0" }}
            />
          </div>
        )}

        {!isButtonClicked && (
          <button className="btn btn-primary m-1" onClick={generateQRCode}>
            View QR Code
          </button>
        )}

        {isButtonClicked && (
          <button className="btn btn-primary mt-1 mb-0" onClick={handleDownload}>
            Download
          </button>
        )}
      </div>
    </div>
  );
}


export default QrGenerator;
