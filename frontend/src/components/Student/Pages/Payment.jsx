import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "./Payment.css";
import LoadingSpinner from "../../Loading/Loading";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
  const [studentData, setStudentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [hashkey, setHashKey] = useState("");
  const [showPopup, setShopPopup] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [monthsToDisplay, setMonthsToDisplay] = useState(
    Array.from({ length: new Date().getMonth() + 1 }, (_, i) =>
      new Date(0, i).toLocaleString("en-US", { month: "long" })
    )
  );
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.admissionNo;
  const objId = user?.id;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const query = `/api/students/${objId}`;
        setIsLoading(true);
        const response = await fetch(query, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
        } else {
          console.error("Error fetching payment records");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching payment records:", error);
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [selectedYear, monthsToDisplay]);
  const {
    admission_no,
    fullname,
    first_name,
    last_name,
    dateOfBirth,
    phone,
    address,
    gender,
    picture,
    parent_Name,
    parent_occupation,
    admission_year,
    admitted_grade,
    email,
    grade,
  } = studentData || {};

  const [orderDetails, setOrderDetails] = useState({
    merchantId: process.env.REACT_APP_PAYHERE_MERCHANT_ID,
    orderId: objId,
    payHereAmount: "1000.00",
    currency: "LKR",
  });

  useEffect(() => {
    const fetchPaymentRecords = async () => {
      try {
        const query = `/api/payment/records?admissionNo=${studentId}&year=${selectedYear}`;
        const response = await fetch(query, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const paymentRecords = data;
          setPaymentRecords(paymentRecords);
        } else {
          console.error("Error fetching payment records");
        }
      } catch (error) {
        console.error("Error fetching payment records:", error);
      }
    };

    fetchPaymentRecords();
  }, [selectedYear, monthsToDisplay]);

  let newMonthsToDisplay;
  const handleYearChange = async (event) => {
    const newSelectedYear = event.target.value;
    setSelectedYear(newSelectedYear);

    // Generate an array for the months to display based on the selected year
    const currentYear = new Date().getFullYear();
    const currentMonth =
      currentYear === newSelectedYear ? new Date().getMonth() + 1 : 12;
    if (newSelectedYear == currentYear) {
      newMonthsToDisplay = Array.from({ length: currentMonth - 1 }, (_, i) =>
        new Date(newSelectedYear, i).toLocaleString("en-US", { month: "long" })
      );
    } else {
      newMonthsToDisplay = Array.from({ length: currentMonth }, (_, i) =>
        new Date(newSelectedYear, i).toLocaleString("en-US", { month: "long" })
      );
    }
  
    setMonthsToDisplay(newMonthsToDisplay);

    // Fetch payment records for the selected year
    try {
      const userInfo = localStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);
      const studentId = user?.admissionNo;

      const query = `/api/payment/records?admissionNo=${studentId}&year=${newSelectedYear}`;
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentRecords(data);
      } else {
        console.error("Error fetching payment records");
      }
    } catch (error) {
      console.error("Error fetching payment records:", error);
    }
  };

  const generateHash = async () => {
    const response = await fetch("/api/payment/generate-hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });
    const data = await response.json();
    const hash = data.hash;
    return hash;
  };

  useEffect(() => {
    generateHash().then((hash) => {
      setHashKey(hash);
    });
  });

  const openPopup = (details) => {
    const record = paymentRecords.find((r) => r.paymentMonth === details.month);

    const paymentDate = record
      ? new Date(record.paymentDateWithTime).toLocaleDateString("en-GB")
      : null;
    const paymentTime = record
      ? new Date(record.paymentDateWithTime).toLocaleTimeString()
      : null;
    const paymentMethod = record ? record.paymentMethod : null;

    setSelectedPaymentDetails({
      ...details,
      paymentDate,
      paymentTime,
      paymentMethod,
    });

    // Open the popup
    setShopPopup(true);
  };

  const closePopup = () => {
    setShopPopup(false);
  };

  return (
    <div>
      <div class="nine">
        <h1>
          STUDENTS<span>Payment Records for {selectedYear} </span>
        </h1>
      </div>
      <label>Year : </label>
      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from(
          { length: new Date().getFullYear() - 2021 + 1 },
          (_, i) => new Date().getFullYear() - i
        ).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table className="styled-table" striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Payment Date 🗓️</th>
              <th>Time 🕝</th>
              <th>Review </th>
              <th>Payment Status / Option</th>
            </tr>
          </thead>
          <tbody>
            {monthsToDisplay.map((month) => {
              const record = paymentRecords.find(
                (r) => r.paymentMonth === month
              );
              const item = `School Fee For ${selectedYear}_${month}`;
              const amount = "1000.00";
              const monthAndYear = [selectedYear, month];
              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>
                    {record
                      ? new Date(record.paymentDateWithTime).toLocaleDateString(
                          "en-GB"
                        )
                      : "-"}
                  </td>
                  <td>
                    {record
                      ? new Date(
                          record.paymentDateWithTime
                        ).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td>
                    {record ? (
                      <Button
                        variant=""
                        onClick={() => openPopup({ month, amount })}
                      >
                        📝📋
                      </Button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {record ? (
                      <span>✅</span>
                    ) : (
                      <form
                        method="post"
                        action="https://sandbox.payhere.lk/pay/checkout"
                      >
                        <input
                          type="hidden"
                          name="merchant_id"
                          value={process.env.REACT_APP_PAYHERE_MERCHANT_ID}
                        />
                        <input
                          type="hidden"
                          name="return_url"
                          value="https://edutrack-uef1.onrender.com/Student/Payment"
                        />
                        <input
                          type="hidden"
                          name="cancel_url"
                          value="https://edutrack-uef1.onrender.com/Student/Payment"
                        />
                        <input
                          type="hidden"
                          name="notify_url"
                          value="https://edutrack-uef1.onrender.com/api/payment/payment-notification"
                        />
                        <input type="hidden" name="order_id" value={objId} />
                        <input type="hidden" name="items" value={item} />
                        <input type="hidden" name="amount" value={amount} />
                        <input type="hidden" name="currency" value="LKR" />
                        <input
                          type="hidden"
                          name="first_name"
                          value={first_name}
                        />
                        <input
                          type="hidden"
                          name="last_name"
                          value={last_name}
                        />
                        <input type="hidden" name="email" value={email} />
                        <input type="hidden" name="phone" value={phone} />
                        <input type="hidden" name="address" value={address} />
                        <input type="hidden" name="city" value="Your_City" />
                        <input
                          type="hidden"
                          name="custom_1"
                          value={monthAndYear}
                        />
                        <input
                          type="hidden"
                          name="custom_2"
                          value={studentId}
                        />
                        <input
                          type="hidden"
                          name="country"
                          value="Your_Country"
                        />
                        <input type="hidden" name="hash" value={hashkey} />
                        <button
                          className="btn btn-info"
                          type="submit"
                          style={{
                            //   display: "flex",
                            //   justifyContent: "center",
                            //   alignItems: "center",
                            width: "50%",
                            //   padding: "3px",
                            marginLeft: "30%", // Add padding for better appearance
                          }}
                        >
                          <spam>Pay with </spam>
                          <img
                            src="https://www.pngkey.com/png/full/512-5124189_payhere-sri-lankas-most-affordable-innovative-payment-audience.png"
                            style={{
                              //   display: "flex",
                              //   justifyContent: "center",
                              //   alignItems: "center",
                              height: "15px",
                              width: "60%",
                              //   padding: "3px",
                              //   marginLeft: "35%", // Add padding for better appearance
                            }}
                            alt=""
                          />
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Popup open={showPopup}>
        <div className="popup-background-student">
          <div className="popup-container-delete">
            {selectedPaymentDetails && (
              <div>
                <table class="table" style={{ textAlign: "left" }}>
                  <tbody>
                    <tr class="success">
                      <td>Month</td>
                      <td>:&nbsp; {selectedPaymentDetails.month}</td>
                    </tr>
                    <tr class="success">
                      <td>Amount</td>
                      <td>:&nbsp; {selectedPaymentDetails.amount}</td>
                    </tr>
                    <tr class="success">
                      <td>Date</td>
                      <td>:&nbsp; {selectedPaymentDetails.paymentDate}</td>
                    </tr>
                    <tr class="success">
                      <td>Time</td>
                      <td>:&nbsp; {selectedPaymentDetails.paymentTime}</td>
                    </tr>
                    <tr class="success">
                      <td>Payment Method</td>
                      <td>: &nbsp;{selectedPaymentDetails.paymentMethod}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <button type="button" class="btn btn-danger" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Payment;
