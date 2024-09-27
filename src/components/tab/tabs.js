import React, { useState } from 'react';
import { Rate } from 'antd';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { Tabs as AntTabs } from 'antd';  // AntTabs is still used from Ant Design

import './tabs.css'

const CustomTabs = () => {
  return (
    <div style={{ padding: "10px 150px",backgroundColor:"#f5f5f5" }}>
      <AntTabs
        defaultActiveKey="1"
        type="card"  // Card type tabs
        size="middle"
        items={[
          {
            label: 'Trang chủ',  // Home Tab
            key: '1',
            children: <div>
              Đánh giá cao nhất

              <Row gutter={60}>
                <Col span={6}>
                <Card className='card-container' style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}  >
                    <Link   style={{ textDecoration: "none", width: "100%" }}>
                      <img class="home-product-item__img" alt='' src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"></img>
                      <h4 class="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
                      <div class="home-product-item__price">
                        <span class="home-product-item__price-old">2.565.000đ</span>
                        <span class="home-product-item__price-current">2.000.000đ</span>
                      </div>
                      <div class="home-product-item__action">

                        <div class="home-product-item__rating">
                          <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <span class="home-product-item__sold">88 đã bán</span>
                      </div>
                      <div className="label">
                        <p className="text-wrapper">Thêm vào giỏ hàng</p>
                      </div>
                      <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <Link className='rental-toy' style={{ textDecoration: "none", color: "#fff"}} to="/rentaltoy">Thuê</Link>
                      </div>
                      <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">43%</span>
                        {/* <span class="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </Card>
                </Col>
                <Col span={6}>
                <Card className='card-container' style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}  >
                    <Link   style={{ textDecoration: "none", width: "100%" }}>
                      <img class="home-product-item__img" alt='' src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"></img>
                      <h4 class="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
                      <div class="home-product-item__price">
                        <span class="home-product-item__price-old">2.565.000đ</span>
                        <span class="home-product-item__price-current">2.000.000đ</span>
                      </div>
                      <div class="home-product-item__action">

                        <div class="home-product-item__rating">
                          <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <span class="home-product-item__sold">88 đã bán</span>
                      </div>
                      <div className="label">
                        <p className="text-wrapper">Thêm vào giỏ hàng</p>
                      </div>
                      <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <Link className='rental-toy' style={{ textDecoration: "none", color: "#fff"}} to="/rentaltoy">Thuê</Link>
                      </div>
                      <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">43%</span>
                        {/* <span class="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </Card>
                </Col>
                 <Col span={6}>
                 <Card className='card-container' style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}  >
                    <Link   style={{ textDecoration: "none", width: "100%" }}>
                      <img class="home-product-item__img" alt='' src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"></img>
                      <h4 class="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
                      <div class="home-product-item__price">
                        <span class="home-product-item__price-old">2.565.000đ</span>
                        <span class="home-product-item__price-current">2.000.000đ</span>
                      </div>
                      <div class="home-product-item__action">

                        <div class="home-product-item__rating">
                          <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <span class="home-product-item__sold">88 đã bán</span>
                      </div>
                      <div className="label">
                        <p className="text-wrapper">Thêm vào giỏ hàng</p>
                      </div>
                      <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <Link className='rental-toy' style={{ textDecoration: "none", color: "#fff"}} to="/rentaltoy">Thuê</Link>
                      </div>
                      <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">43%</span>
                        {/* <span class="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </Card>
                </Col>
                <Col span={6}>
                <Card className='card-container' style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}  >
                    <Link   style={{ textDecoration: "none", width: "100%" }}>
                      <img class="home-product-item__img" alt='' src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"></img>
                      <h4 class="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
                      <div class="home-product-item__price">
                        <span class="home-product-item__price-old">2.565.000đ</span>
                        <span class="home-product-item__price-current">2.000.000đ</span>
                      </div>
                      <div class="home-product-item__action">

                        <div class="home-product-item__rating">
                          <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <span class="home-product-item__sold">88 đã bán</span>
                      </div>
                      <div className="label">
                        <p className="text-wrapper">Thêm vào giỏ hàng</p>
                      </div>
                      <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <Link className='rental-toy' style={{ textDecoration: "none", color: "#fff"}} to="/rentaltoy">Thuê</Link>
                      </div>
                      <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">43%</span>
                        {/* <span class="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </Card>
                </Col>
                <Col span={6}>
                <Card className='card-container' style={{ padding: "0px 0px", alignItems: 'center' }} hoverable={true}  >
                    <Link   style={{ textDecoration: "none", width: "100%" }}>
                      <img class="home-product-item__img" alt='' src="https://www.hamleys.com/media/catalog/product/5/4/547034_alt1_uzolyce0xdlhbxbu.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"></img>
                      <h4 class="home-product-item__name">Toy Story 4 Sheriff Woody</h4>
                      <div class="home-product-item__price">
                        <span class="home-product-item__price-old">2.565.000đ</span>
                        <span class="home-product-item__price-current">2.000.000đ</span>
                      </div>
                      <div class="home-product-item__action">

                        <div class="home-product-item__rating">
                          <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <span class="home-product-item__sold">88 đã bán</span>
                      </div>
                      <div className="label">
                        <p className="text-wrapper">Thêm vào giỏ hàng</p>
                      </div>
                      <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <Link className='rental-toy' style={{ textDecoration: "none", color: "#fff"}} to="/rentaltoy">Thuê</Link>
                      </div>
                      <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">43%</span>
                        {/* <span class="home-product-item__sale-off-label">GIẢM</span> */}
                      </div>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </div>,  // Content for Home Tab
          },
          {
            label: 'Sản phẩm',  // Products Tab
            key: '2',
            children: <div>Content of Sản phẩm (Products)</div>,  // Content for Products Tab
          },
          {
            label: 'Liên hệ',  // Contact Tab
            key: '3',
            children: <div>Content of Liên hệ (Contact)</div>,  // Content for Contact Tab
          },
        ]}
      />
    </div>
  );
};

export default CustomTabs;
