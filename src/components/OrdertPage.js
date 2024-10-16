import React from 'react';
import { useSelector } from 'react-redux';

const OrderPage = () => {
  const orderData = useSelector((state) => state.order.orderData); // Access order data from Redux

  return (
    <div>
      <h1>Order Page</h1>
      {orderData.length > 0 ? (
        <ul>
          {orderData.map((item, index) => (
            <li key={index}>
              Toy ID: {item.toyId}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No order data available.</p>
      )}
    </div>
  );
};

export default OrderPage;
