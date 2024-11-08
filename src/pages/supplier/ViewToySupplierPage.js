import React from "react";
import { Tabs as AntTabs } from "antd";
import ViewToyRentBySupplier from "./ViewToyRentSupplier";

// import "./tabs.css";

const ViewToySupplierPage = () => {
  const items = [
    {
      label: "Toy Rent",
      key: "1",
      children: <ViewToyRentBySupplier />,
    },
    {
      label: "Order Sale Detail",
      key: "2",
    //   children: <OrderSaleDetailSupplier />,
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

export default ViewToySupplierPage;
