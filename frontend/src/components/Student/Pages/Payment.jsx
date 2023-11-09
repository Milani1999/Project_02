import React, { useState, useEffect } from 'react';

const Payment = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [hashkey, setHashKey] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    merchantId: "1224594",
    orderId: "19980103",
    payHereAmount: "1000.00",
    currency: "LKR",
  });
  const [monthsToDisplay, setMonthsToDisplay] = useState(
    Array.from({ length: new Date().getMonth() + 1 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' }))
  );

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.admissionNo;

  useEffect(() => {
    const fetchPaymentRecords = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        const user = JSON.parse(userInfo);
        const studentId = user?.admissionNo;

        const query = `/api/payment/records?admissionNo=${studentId}&year=${selectedYear}`;
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

    fetchPaymentRecords();
  }, [selectedYear]);

  const makePayment = async (selectedMonth) => {
    const checkoutDetails = {
      studentId: "123456", // Replace with the logged-in student's ID
      amount: '5000',
      year: selectedYear,
      month: selectedMonth,
    };

    try {
      const response = await fetch("/api/payment/make-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutDetails),
      });

      if (response.ok) {
        // Handle success, maybe show a modal or redirect to PayHere checkout
        console.log("Payment initiation successful");
      } else {
        // Handle error
        console.error("Error initiating payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleYearChange = async (event) => {
    const newSelectedYear = event.target.value;
    setSelectedYear(newSelectedYear);

    // Generate an array for the months to display based on the selected year
    const newMonthsToDisplay = Array.from(
      { length: newSelectedYear === new Date().getFullYear() ? new Date().getMonth() + 1 : 12 },
      (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' })
    );

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
        {Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <table>
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
            const record = paymentRecords.find(r => r.paymentMonth === month);
            const item = `SCHOOLFEES For ${selectedYear}_${month}`;
            const amount = '5000';

            return (
              <tr key={month}>
                <td>{month}</td>
                <td>{record ? record.paymentDateWithTime : '-'}</td>
                <td>
                  {/* {record && record.pdfUrl ? <a href={record.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a> : '-'} */}
                  -
                </td>
                <td>
                  {record ? 'Paid' : (
                    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
                      <input type="hidden" name="merchant_id" value="1224594" />
                      <input
                        type="hidden"
                        name="return_url"
                        value="https://www.uissrilanka.com"
                      />
                      <input
                        type="hidden"
                        name="cancel_url"
                        value="https://www.uissrilanka.com"
                      />
                      <input
                        type="hidden"
                        name="notify_url"
                        value="https://www.uissrilanka.com"
                      />
                      <input type="hidden" name="order_id" value="19980103" />
                      <input type="hidden" name="items" value={item} />
                      <input type="hidden" name="amount" value='1000.00' />
                      <input type="hidden" name="currency" value="LKR" />
                      <input type="hidden" name="first_name" value="Kobi" />
                      <input type="hidden" name="last_name" value="Vijaykumar" />
                      <input type="hidden" name="email" value="vkobi1998@gmail.com" />
                      <input type="hidden" name="phone" value="0767574808" />
                      <input type="hidden" name="address" value="Your_Address" />
                      <input type="hidden" name="city" value="Your_City" />
                      <input type="hidden" name="country" value="Your_Country" />
                      <input type="hidden" name="hash" value={hashkey} />
                      <button type="submit">Pay Now</button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;

