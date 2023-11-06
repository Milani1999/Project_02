import React, { useState, useEffect } from "react";
import md5 from "crypto-js/md5";

// Update this import path to your context file

const Payment = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paymentRecords, setPaymentRecords] = useState([]);

  useEffect(() => {
    const fetchPaymentRecords = async () => {
      // Replace with actual logic to fetch payment records
      // ...

      // Load PayHere script
      loadPayHereScript();
    };

    fetchPaymentRecords();
  }, [selectedYear]);

  const loadPayHereScript = () => {
    // Load the PayHere script only if it's not already loaded
    if (!window.payhere) {
      const script = document.createElement("script");
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Generate an array for the months to display
  const monthsToDisplay = Array.from(
    {
      length:
        selectedYear === new Date().getFullYear()
          ? new Date().getMonth() + 1
          : 12,
    },
    (_, i) => new Date(0, i).toLocaleString("en-US", { month: "long" })
  );

  // Define merchant details (normally retrieved from a secure source or environment variables)
  const merchantId = '1224567';
  const merchantSecret = 'MjMzMzgzMjAwNjMxNjY5MDI3ODA0MjQzMjM3MzMxMTA1ODg1NjQzOA==';

  // Function to generate the hash (this should ideally be done on the server)
  const generateHash = (orderId, amount) => {
    const hashString = `${merchantId}${orderId}${amount}LKR${md5(merchantSecret)
      .toString()
      .toUpperCase()}`;
    return md5(hashString).toString().toUpperCase();
  };

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
            const record = paymentRecords.find((r) => r.month === month);
            const order_id = `SCHOOLFEES_${selectedYear}_${month}`;
            const amount = "5000.00"; // Replace with the actual fee amount
            const hash = generateHash(order_id, amount);

            return (
              <tr key={month}>
                <td>{month}</td>
                <td>{record ? record.paymentDateWithTime : "-"}</td>
                <td>
                  {record && record.pdfUrl ? (
                    <a
                      href={record.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {record ? (
                    "Paid"
                  ) : (
                    <form
                      method="post"
                      action="https://sandbox.payhere.lk/pay/checkout"
                    >
                      <input
                        type="hidden"
                        name="merchant_id"
                        value={merchantId}
                      />
                      <input
                        type="hidden"
                        name="return_url"
                        value="http://yourwebsite.com/return"
                      />
                      <input
                        type="hidden"
                        name="cancel_url"
                        value="http://yourwebsite.com/cancel"
                      />
                      <input
                        type="hidden"
                        name="notify_url"
                        value="http://yourwebsite.com/notify"
                      />
                      <input type="hidden" name="order_id" value={order_id} />
                      <input
                        type="hidden"
                        name="items"
                        value={`School Fees for ${month} ${selectedYear}`}
                      />
                      <input type="hidden" name="amount" value={amount} />
                      <input type="hidden" name="currency" value="LKR" />
                      <input
                        type="hidden"
                        name="first_name"
                        value="Your_First_Name"
                      />
                      <input
                        type="hidden"
                        name="last_name"
                        value="Your_Last_Name"
                      />
                      <input type="hidden" name="email" value="Your_Email" />
                      <input
                        type="hidden"
                        name="phone"
                        value="Your_Phone_Number"
                      />
                      <input
                        type="hidden"
                        name="address"
                        value="Your_Address"
                      />
                      <input type="hidden" name="city" value="Your_City" />
                      <input
                        type="hidden"
                        name="country"
                        value="Your_Country"
                      />
                      <input type="hidden" name="hash" value={hash} />
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
