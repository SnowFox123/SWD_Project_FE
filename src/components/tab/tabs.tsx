import React from "react";
import { Rate } from "antd";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Tabs as AntTabs } from "antd"; // AntTabs is still used from Ant Design

import "./tabs.css";
import ToyRent from "../../pages/toy/toyrent/ToyRent";
import ToySale from "../../pages/toy/toysale/ToySale";

// Define the interface for AntTabs items
interface TabItem {
  label: string;
  key: string;
  children: React.ReactNode; // ReactNode to represent the JSX content
}

const CustomTabs: React.FC = () => {
  const items: TabItem[] = [
    {
      label: "Rent Toys", // Home Tab
      key: "1",
      children: <ToyRent />,
      // (
      //   <div>
      //     Đánh giá cao nhất
      //     <Row gutter={60}>
      //       <Col span={6}>
      //         <Card className="card-container" style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}>
      //           <Link to="/rentaltoy" style={{ textDecoration: "none", width: "100%" }}>
      //             <img
      //               className="home-product-item__img"
      //               alt="Toy"
      //               src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
      //             />
      //             <h4 className="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
      //             <div className="home-product-item__price">
      //               <span className="home-product-item__price-old">2.565.000đ</span>
      //               <span className="home-product-item__price-current">2.000.000đ</span>
      //             </div>
      //             <div className="home-product-item__action">
      //               <div className="home-product-item__rating">
      //                 <Rate allowHalf defaultValue={2.5} />
      //               </div>
      //               <span className="home-product-item__sold">88 đã bán</span>
      //             </div>
      //             <div className="label">
      //               <p className="text-wrapper">Thêm vào giỏ hàng</p>
      //             </div>
      //             <div className="home-product-item__favourite">
      //               <i className="fas fa-check"></i>
      //               <Link className="rental-toy" style={{ textDecoration: "none", color: "#fff" }} to="/rentaltoy">Thuê</Link>
      //             </div>
      //             <div className="home-product-item__sale-off">
      //               <span className="home-product-item__sale-off-percent">43%</span>
      //             </div>
      //           </Link>
      //         </Card>
      //       </Col>
      //     </Row>
      //   </div>
      // ),
    },
    {
      label: "Sale Toys ", // Products Tab
      key: "2",
      children: <ToySale />, // Content for Products Tab
    },
    // {
    //   label: 'Liên hệ',  // Contact Tab
    //   key: '3',
    //   children: <div>Content of Liên hệ (Contact)</div>,  // Content for Contact Tab
    // },
  ];

  return (
    <div style={{ padding: "10px 150px", backgroundColor: "#f5f5f5" }}>
      <AntTabs
        defaultActiveKey="1"
        type="card" // Card type tabs
        size="middle"
        items={items}
      />
    </div>
  );
};

export default CustomTabs;
