import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  status: boolean; // Keeping status as boolean
  price: number;
  quantity: number;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Toy Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>, // Changed <a> to <span> to avoid accessibility issues
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) => (status ? "Thuê" : "Mua"), // Render based on boolean value
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* Changed <a> to <button> for better accessibility */}
        <button>Edit</button>
        <button>Delete</button>
      </Space>
    ),
  },
];

// Updated to match the DataType structure without extra properties
const dataSource = Array.from({ length: 46 }).map<DataType>((_, i) => {
  const price = 99;
  const quantity = 2;
  const status = Math.random() > 0.5; // Trạng thái ngẫu nhiên
  return {
    key: i,
    name: `Toy story ${i}`,
    status: status, // Use the boolean value directly
    price: price,
    quantity: quantity,
  };
});

const Cart: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // Simulate an AJAX request
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Space>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </Space>
  );
};

export default Cart;
