import React, { useState } from "react";
import qrcode from "qrcode";

function QrGenerator(props) {
  const { student_ad } = props;

  const [imageQR, setImageQR] = useState();
  const generateQRCode = async () => {
    const image = await qrcode.toDataURL(student_ad);
    setImageQR(image);
  };
  return (
    <div>
      {/* <div className="card-body text-center"> */}
        {/* <p>QR Code </p> */}
        {imageQR && <img src={imageQR} width="40%" alt="qr_code" />}

        {
          <button className="btn btn-primary m-1" 
          onClick={generateQRCode}>
            View QR Code
          </button>

        }
        {/* <p>{student_ad}</p> */}
        {
          <a href={imageQR} download>
            <button className="btn btn-primary " onClick={generateQRCode}>
              Download
            </button>
          </a>
        }
      </div>
    // </div>
  );
}

export default QrGenerator;
