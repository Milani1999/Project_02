import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = ({}) => {
  const initialOptions = {
    clientId:"test",
        currency: "USD",
    intent: "capture",
  };
  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons />
        </PayPalScriptProvider>
 
    </div>
  );
};

export default Payment;


