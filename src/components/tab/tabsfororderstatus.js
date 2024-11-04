import React from "react";
import { Tabs as AntTabs } from "antd";

import "./tabs.css";
import OrderRentStatus from "../../pages/user/order/OrderRentStatus";
import OrderSaleStatus from "../../pages/user/order/OrderSaleStatus";

const TabsForOrderStatus = () => {
  const items = [
    {
      label: "Order Rent Status",
      key: "1",
      children: <OrderRentStatus />,
    },
    {
      label: "Order Sale Status",
      key: "2",
      children: <OrderSaleStatus />,
    },
  ];

  return (
    <div style={{ padding: "10px 150px", backgroundColor: "#f5f5f5" }}>
      <AntTabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={items}
      />
    </div>
  );
};

export default TabsForOrderStatus;
