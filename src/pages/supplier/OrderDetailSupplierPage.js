import React from "react";
import { Tabs as AntTabs } from "antd";

// import "./tabs.css";
import OrderRentDetailSupplier from "./OrderRentDetailSupplier";
import OrderSaleDetailSupplier from "./OrderSaleDetailSupplier";

const OrderDetailSupplierPage = () => {
  const items = [
    {
      label: "Order Rent Detail",
      key: "1",
      children: <OrderRentDetailSupplier />,
    },
    {
      label: "Order Sale Detail",
      key: "2",
      children: <OrderSaleDetailSupplier />,
    },
  ];

  return (
      <AntTabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={items}
      />
  );
};

export default OrderDetailSupplierPage;
