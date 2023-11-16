import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./StudentAttendance.css";
import LoadingSpinner from "../../Loading/Loading";

const AdminPaymentRecords = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const getFormattedMonth = (monthNumber) => {
    return monthNames[monthNumber - 1];
  };

  const fetchPaymentRecords = async () => {
    try {
      const formattedMonth = getFormattedMonth(selectedMonth);
      setIsLoading(true);
      const response = await fetch(
        `/api/payment/getPaymentByDate?year=${selectedYear}&month=${formattedMonth}&grade=${selectedGrade}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setPaymentData(data);
      } else {
        setPaymentData([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching payment records:", error);
      setPaymentData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentRecords();
  }, [selectedYear, selectedMonth, selectedGrade]);
  // useEffect(() => {
  //   const fetchPaymentRecords = async () => {
  //     try {
  //       const query = `/api/payment/getPaymentByDate?year=2023&month=January&grade=9`;
  //       const response = await fetch(query, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         const paymentRecords = data;
  //         setPaymentData(paymentRecords);
  //       } else {
  //         console.error(`Error fetching payment records. Server returned status ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error('Error handling response:', error);
  //     }
  //   };

  //   fetchPaymentRecords();
  // }, [selectedYear, selectedMonth, selectedGrade]);

  return (
    <Container>
      <div class="nine">
        <h1>
          STUDENTS<span>Payments Record</span>
        </h1>
      </div>
      <Row className="mb-3">
  <Col md={2}>
    <label className="label_selectyear" htmlFor="yearSelect">
      Select Year:{" "}
    </label>
    <input
      className="yearpicker_payment"
      type="number"
      id="yearSelect"
      min="2000"
      max="2100"
      value={selectedYear}
      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
    />
  </Col>

  <Col md={3}>
    <label className="label_selectmonth" htmlFor="monthSelect">
      Select Month:
    </label>
    <select
      className="monthpicker_payment"
      id="monthSelect"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
    >
      {monthNames.map((month, index) => (
        <option key={index + 1} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  </Col>

  <Col md={4} className="d-flex">
    <label className="label_selectgrade" htmlFor="gradeSelect">
      Select Grade:{" "}
    </label>
    <select
      id="gradeSelect"
      className="ms-4"
      value={selectedGrade}
      onChange={(e) => setSelectedGrade(parseInt(e.target.value))}
    >
      {[...Array(11).keys()].map((grade) => (
        <option key={grade} value={grade + 1}>
          Grade {grade + 1}
        </option>
      ))}
    </select>
  </Col>
</Row>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Table className="styled-table" striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Admission No</th>
                <th>Full Name</th>
                <th>Grade</th>
                <th>Payment Date</th>
                <th>Time</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData &&
                paymentData.map((entry, index) => {
                  const student = entry.student;
                  const payment = entry.payment;

                  return (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.admission_no}</td>
                      <td>{student.fullname}</td>
                      <td>{student.grade}</td>
                      <td>
                        {payment && payment.paymentDateWithTime
                          ? new Date(
                              payment.paymentDateWithTime
                            ).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                      <td>
                        {payment && payment.paymentDateWithTime
                          ? new Date(
                              payment.paymentDateWithTime
                            ).toLocaleTimeString("en-US")
                          : "-"}
                      </td>
                      <td>
                        {payment ? (
                          <input type="checkbox" checked={payment} />
                        ) : (
                          <input type="checkbox" checked={false} disabled />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default AdminPaymentRecords;
