import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentInfo } from '../../services/UserServices';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderCode');
    const code = params.get('code');

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            if (orderId) {
                try {
                    const data = await PaymentInfo(orderId);
                    setPaymentDetails(data);
                } catch (err) {
                    setError("Failed to fetch payment information.");
                } finally {
                    setLoading(false);
                }
            } else {
                setError("No order ID found in the URL.");
                setLoading(false);
            }
        };

        fetchPaymentInfo();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const isSuccess = code === '00';

    // Updated function to extract description starting from the second space
    // Function to extract content after the specific phrase "Payment for order"
    // Function to extract content after the specific phrase "Payment for order" and remove the trailing "Trace"
    // Function to extract the specific payment description
    const extractDescriptionContent = (description) => {
        // Find the start of the payment description
        const startIndex = description.indexOf("Payment for order");

        // If found, extract the relevant part
        if (startIndex !== -1) {
            // Split the description by spaces to isolate the payment part
            const descriptionParts = description.substring(startIndex).split("Trace")[0]; // Only take content before "Trace"
            return descriptionParts.trim(); // Trim whitespace
        }

        // Fallback if the phrase is not found
        return description;
    };




    return (
        <div className="payment-success">
            <h1 className={isSuccess ? '' : 'failed'}>
                {isSuccess ? 'Payment Successful!' : 'Payment Failed!'}
            </h1>
            <h2>Order ID: {orderId}</h2>

            <div>
                <h4>Payment Details</h4>
                {paymentDetails.object.transactions.map((transaction, index) => (
                    <div>
                        <div className="detail-item">
                            <span className="label2">Order Code:</span>
                            <span className="value">{paymentDetails.object.orderCode}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Account Name::</span>
                            <span className="value">{transaction.counterAccountName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Account Number:</span>
                            <span className="value">{transaction.counterAccountNumber}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Amount:</span>
                            <span className="amount">{transaction.amount} VND</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Transaction Date:</span>
                            <span className="value">{new Date(transaction.transactionDateTime).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Reference:</span>
                            <span className="value">{transaction.reference}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Description:</span>
                            <span className="value">{extractDescriptionContent(transaction.description)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label2">Status:</span>
                            <span className="value">{paymentDetails.object.status}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="footer">
                <p style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>Thank you for your transaction</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
