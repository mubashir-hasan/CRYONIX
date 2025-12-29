import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";


const stripePromise = loadStripe("pk_test_51SY5VcCgxOqDUticpSUMcoOyPT8UK2M8D5I9QII8SPdzVgRFuvFQRoLF9eemmPJDWjazkxT875Ys45AZsq8XRPo500D8f4A7p3");

function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {

        if (!stripe || !elements) {
            alert("Stripe not loaded yet.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // ✅ Fetch client secret from backend
            const response = await fetch("http://localhost:5000/api/payment/charge-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    price: 200,
                }),
            });

            const jsonData = await response.json();

            if (!jsonData.client_secret) {
                throw new Error("Client secret not received from backend!");
            }

            
            const result = await stripe.confirmCardPayment(
                jsonData.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (result.error) {
                setError(result.error.message);
            } else {
                alert("✅ Payment Successful!");
                console.log("Payment Result:", result);
            }

        } catch (err) {
            console.error("Payment error:", err);
            setError("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>

            <h2>Stripe Payment</h2>

            <div style={{
                padding: "15px",
                border: "1px solid gray",
                borderRadius: "8px",
                marginBottom: "20px"
            }}>
                <CardElement />
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    background: "black",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                {loading ? "Processing..." : "Pay"}
            </button>

            {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
    );
}

export default function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <Checkout />
        </Elements>
    );
}
