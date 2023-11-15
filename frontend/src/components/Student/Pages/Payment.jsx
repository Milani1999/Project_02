import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Payment = () => {
  const [studentData, setStudentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [hashkey, setHashKey] = useState("");

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
      } catch (error) {
        console.error("Error fetching payment records:", error);
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
    orderId: studentId,
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

    // Update the monthsToDisplay state
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
  }, []);

  return (
    <div>
      <h2>Payment Records for {selectedYear}</h2>
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

      <Table className="styled-table" striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment Date and Time</th>
            <th>Review</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {monthsToDisplay.map((month) => {
            const record = paymentRecords.find((r) => r.paymentMonth === month);
            const item = `School Fee For ${selectedYear}_${month}`;
            const amount = "1000.00";

            return (
              <tr key={month}>
                <td>{month}</td>
                {/* <td>{record ? record.paymentDateWithTime : "-"}</td> */}
                {/* <td>{record ? new Date(record.paymentDateWithTime).toLocaleDateString() : "-"}</td> */}
                <td>{record ? new Date(record.paymentDateWithTime).toLocaleTimeString() : "-"}</td>
                <td>
                  {/* {record && record.pdfUrl ? <a href={record.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a> : '-'} */}
                  -
                </td>
                <td>
                  {record ? (
                    "Paid"
                  ) : (
                    <form
                      method="post"
                      action="https://sandbox.payhere.lk/pay/checkout"
                    >
                      <input type="hidden" name="merchant_id" value="1224594" />
                      <input
                        type="hidden"
                        name="return_url"
                        value="http://localhost:3000/Student/Payment"
                      />
                      <input
                        type="hidden"
                        name="cancel_url"
                        value="https://www.uissrilanka.com"
                      />
                      <input
                        type="hidden"
                        name="notify_url"
                        value="https://3816-103-21-165-12.ngrok.io/api/payment/payment-notification"
                      />
                      <input type="hidden" name="order_id" value={studentId} />
                      <input type="hidden" name="items" value={item} />
                      <input type="hidden" name="amount" value={amount} />
                      <input type="hidden" name="currency" value="LKR" />
                      <input
                        type="hidden"
                        name="first_name"
                        value={first_name}
                      />
                      <input type="hidden" name="last_name" value={last_name} />
                      <input type="hidden" name="email" value={email} />
                      <input type="hidden" name="phone" value={phone} />
                      <input type="hidden" name="address" value={address} />
                      <input type="hidden" name="city" value="Your_City" />
                      <input type="hidden" name="custom_1" value={month} />
                      <input
                        type="hidden"
                        name="custom_2"
                        value={selectedYear}
                      />
                      <input
                        type="hidden"
                        name="country"
                        value="Your_Country"
                      />
                      <input type="hidden" name="hash" value={hashkey} />
                      <button
                        type="submit"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                          padding: "3px",
                          marginLeft: "30%", // Add padding for better appearance
                        }}
                      >
                        Pay Now
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Payment;
