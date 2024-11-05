import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentInfo } from '../../services/UserServices';
import { ReturnRentOrder } from '../../services/UserServices'; // Import ReturnRentOrder here
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderCode');
    const code = params.get('code');
    const cancel = params.get('cancel') === 'true';

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            if (orderId) {
                try {
                    const data = await PaymentInfo(orderId);
                    setPaymentDetails(data);

                    // Check if 'rent2' is in the payment description and call ReturnRentOrder if true
                    const rentTransaction = data.object.transactions.find((transaction) =>
                        transaction.description.includes('rent2')
                    );

                    if (rentTransaction) {
                        await ReturnRentOrder(orderId);
                        console.log("ReturnRentOrder API called successfully");
                    }
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

    const isSuccess = code === '00' && paymentDetails && !cancel;
    const isCancelled = cancel && paymentDetails?.object?.status === "CANCELLED";

    const extractDescriptionContent = (description) => {
        const match = description.match(/Order\s[\w\s]+\spaymentId\d+/);
        return match ? match[0] : description;
    };

    if (isCancelled) {
        return (
            <div className="payment-message payment-cancelled">
                <h1>Payment Cancelled</h1>
                {/* <h2>Order ID: {paymentDetails.object.orderCode}</h2> */}
                <div>
                    {/* <div className="detail-item">
                        <span className="label2">Order Code:</span>
                        <span className="value">{paymentDetails.object.orderCode}</span>
                    </div> */}
                    <div className="detail-item">
                        <span className="label2">Amount:</span>
                        <span className="value status-cancel">{paymentDetails.object.amount} VND</span>
                    </div>
                    <div className="detail-item">
                        <span className="label2">Amount Paid:</span>
                        <span className="value">{paymentDetails.object.amountPaid} VND</span>
                    </div>
                    <div className="detail-item">
                        <span className="label2">Amount Remaining:</span>
                        <span className="value status-cancel">{paymentDetails.object.amountRemaining} VND</span>
                    </div>
                    <div className="detail-item">
                        <span className="label2">Created At:</span>
                        <span className="value">{new Date(paymentDetails.object.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label2">Status:</span>
                        <span className="value status-cancel">{paymentDetails.object.status}</span>
                    </div>
                </div>
                <div className="footer">
                    <p style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>Your payment has been cancelled</p>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-message payment-success">
            <h1 className={isSuccess ? '' : 'failed'}>
                {isSuccess ? 'Payment Successful!' : 'Payment Failed!'}
            </h1>
            {/* <h2>Order ID: {orderId}</h2> */}

            <div>
                <h4>Payment Details</h4>
                {paymentDetails.object.transactions.map((transaction, index) => (
                    <div key={index}>
                        {/* <div className="detail-item">
                            <span className="label2">Order Code:</span>
                            <span className="value">{paymentDetails.object.orderCode}</span>
                        </div> */}
                        <div className="detail-item">
                            <span className="label2">Account Name:</span>
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
                            <span className="value status-success">{paymentDetails.object.status}</span>
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
