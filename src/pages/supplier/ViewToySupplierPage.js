import React from "react";
import { Tabs as AntTabs } from "antd";
import ViewToyRentBySupplier from "./ViewToyRentSupplier";
import ViewToySaleBySupplier from "./ViewToySaleSupplier";

// import "./tabs.css";

const ViewToySupplierPage = () => {
  const items = [
    {
      label: "Toy Rent Posted",
      key: "1",
      children: <ViewToyRentBySupplier />,
    },
    {
      label: "Toy Sale Posted",
      key: "2",
      children: <ViewToySaleBySupplier />,
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
