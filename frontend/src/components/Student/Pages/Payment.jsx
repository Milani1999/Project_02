
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Payment = ({ user }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const studentId = user?.admissionNo;

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const availableMonths = Array.from(
      { length: 12 },
      (_, index) => (currentYear === selectedYear && index > currentMonth ? null : index + 1)
    );

    setMonths(availableMonths.filter((month) => month !== null));

    // Your existing code for fetching payment history
    fetchPaymentHistory();
  }, [selectedYear]);

  const handlePaymentClick = (month) => {
    setSelectedMonth(month);
    setShowPaymentForm(true);
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get(`/api/payment/payment-history?year=${selectedYear}`);
      setPaymentHistory(response.data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handleToken = async (token) => {
    try {
      // Send the token to your backend for payment processing
      const response = await axios.post('/api/createPayment', {
        token,
        studentId,
        amount: 5000, // Set the amount based on your requirements
        paymentYear: selectedYear,
        paymentMonth: selectedMonth,
      });

      if (response.data.success) {
        console.log('Payment successful');
        // Refresh payment history
        fetchPaymentHistory();
      } else {
        console.error('Payment failed');
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Payment History</h2>
      <div className="filter-container">
        <label>Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {Array.from({ length: new Date().getFullYear() - 2021 }, (_, index) => (
            <option key={2022 + index} value={2022 + index}>
              {2022 + index}
            </option>
          ))}
        </select>
      </div>
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
          {months.map((month) => {
            const monthName = new Date(selectedYear, month - 1, 1).toLocaleString('default', {
              month: 'long',
            });
            const paymentRecord = paymentHistory.find(
              (record) =>
                new Date(record.paymentDateWithTime).getMonth() === month - 1 &&
                record.paymentYear === selectedYear
            );

            return (
              <tr key={month}>
                <td>{monthName}</td>
                <td>
                  {paymentRecord ? new Date(paymentRecord.paymentDateWithTime).toLocaleString() : '-'}
                </td>
                <td>
                  {paymentRecord ? (
                    <a href={paymentRecord.review} target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {paymentRecord ? paymentRecord.paymentMethod : (
                    <button onClick={() => handlePaymentClick(month)}>Pay Now</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showPaymentForm && (
        <div className="payment-form">
          <h3>Make a Payment</h3>
          <StripeCheckout
            token={handleToken}
            stripeKey="pk_test_51NoKBjSBqWcAaZje1PLt4TSS1EkGgbj2BGKisoki3993sizkyr0ZLA0XvT0v8XzpZailsaOJbSFDnoQWgcWVaGDb00cuHiJqd8" // Replace with your Stripe Publishable Key
            amount={3500} // Set the amount based on your requirements
          />
        </div>
      )}
    </div>
  );
};

export default Payment;

