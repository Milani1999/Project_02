import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table ,Button} from "react-bootstrap";
import LoadingSpinner from "../../Loading/Loading";
import Popup from "reactjs-popup";

const AdminPaymentRecords = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [showPopup, setShopPopup] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, index) => 2021 + index
  );
  const months =
    currentYear === selectedYear
      ? Array.from(
          { length: new Date().getMonth() + 1 },
          (_, index) => index + 1
        )
      : Array.from({ length: 12 }, (_, index) => index + 1);

  const openPopup = (details) => {

    // Find the payment record for the selected month
    const record = details.payment;
    const stuDetails = details.student;

    // If a record is found, extract the paymentDateWithTime value
    const paymentDate = record
      ? new Date(record.paymentDateWithTime).toLocaleDateString("en-GB")
      : null;
    const paymentTime = record
      ? new Date(record.paymentDateWithTime).toLocaleTimeString()
      : null;
    const paymentMethod = record ? record.paymentMethod : null;
    const month = record ? record.paymentMonth : null;
    const amount = record ? record.amount : null;
    const admission_no = stuDetails ? stuDetails.admission_no : null;
    const fullname = stuDetails ? stuDetails.fullname : null;
    const grade = stuDetails ? stuDetails.grade : null;

    // Set the selected payment details, including paymentDateWithTime
    setSelectedPaymentDetails({
      month,
      amount,
      paymentDate,
      paymentTime,
      paymentMethod,
      admission_no,
      fullname,
      grade,
    });

    // Open the popup
    setShopPopup(true);
  };

  const closePopup = () => {
    setShopPopup(false);
  };

  return (
    <Container>
      <div className="nine">
        <h1>
          STUDENTS<span>Payments Record</span>
        </h1>
      </div>
      <Row className="mb-3">
        <Col md={2}>
          <label className="label_selectyear" htmlFor="yearSelect">
            Select Year:{" "}
          </label>
          <select
            className="yearpicker_payment"
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
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
            {months.map((month) => (
              <option key={month} value={month}>
                {monthNames[month - 1]}
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
                <th>Review</th>
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
                          <Button
                            variant=""
                            onClick={() => openPopup({ payment,student})}
                          >
                            📝📋
                          </Button>
                        ) : (
                          "-"
                        )}
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
      <Popup open={showPopup}>
        <div className="popup-background-student">
          <div className="popup-container-delete">
            {selectedPaymentDetails && (
              <div>
                <table class="table" style={{ textAlign: "left" }}>
                  <tbody>
                  <tr class="success">
                      <td>Fullname</td>
                      <td>: &nbsp;{selectedPaymentDetails.fullname}</td>
                    </tr>
                    <tr class="success">
                      <td>Admission No</td>
                      <td>: &nbsp;{selectedPaymentDetails.admission_no}</td>
                    </tr>
                    <tr class="success">
                      <td>Grade</td>
                      <td>: &nbsp;{selectedPaymentDetails.grade}</td>
                    </tr>
                    <tr class="success">
                      <td>Month</td>
                      <td>:&nbsp; {selectedPaymentDetails.month}</td>
                    </tr>
                    <tr class="success">
                      <td>Amount</td>
                      <td>:&nbsp; Rs.{selectedPaymentDetails.amount}</td>
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
    </Container>
  );
};

export default AdminPaymentRecords;
