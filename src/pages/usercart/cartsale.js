import React, { useEffect, useState, useMemo } from 'react';
import { Table, Spin, message, InputNumber, Checkbox, Button, Modal, Input, Row, Col, Image } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { GetCart, GetCart2, getToyByID } from '../../services/UserServices'; // Import API functions
import {  Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'; // Import useDispatch
import { saveOrderData } from '../../redux/orderSlice'; // Import saveOrderData action

const CartSale = () => {
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [quantities, setQuantities] = useState({});

  const [orderData, setOrderData] = useState([]); // Store order data


  const dispatch = useDispatch(); // Initialize useDispatch


  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const items = await GetCart2();
        const toyDetailsPromises = items.map(async (item) => {
          const toyDetails = await getToyByID(item.toyId);
          return { ...item, toy: toyDetails };
        });

        const cartWithToyDetails = await Promise.all(toyDetailsPromises);

        const saleItems = cartWithToyDetails.filter((item) => !item.toy.isRental);

        setCartItems(saleItems);


        const initialQuantities = saleItems.reduce((acc, item) => {
          acc[item.cartItemId] = item.quantity || 1; // Ensure default quantity
          return acc;
        }, {});

        setQuantities(initialQuantities);
      } catch (err) {
        setError(err);
        message.error('Failed to load cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const updatedOrderData = selectedItems.map(cartItemId => ({
      toyId: cartItems.find(item => item.cartItemId === cartItemId).toy.toyId,
      quantity: quantities[cartItemId] || 1,
    }));
    setOrderData(updatedOrderData);
  }, [selectedItems, quantities, cartItems])

  const handleQuantityChange = (cartItemId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: value } : item
      )
    );
  };

  const handleCheckboxChange = (cartItemId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(cartItemId)) {
        return prevSelected.filter((id) => id !== cartItemId);
      } else {
        return [...prevSelected, cartItemId];
      }
    });
  };

  const handleCreateOrder = () => {

    dispatch(saveOrderData(orderData)); // Dispatch the saveOrderData action
  };

  const handleCreateOrderClick = () => {
    if (selectedItems.length === 0) {
      message.warning('You haven’t selected any products!'); // Show a warning toast
    } else {
      handleCreateOrder(); // Dispatch the action to create the order
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.cartItemId));
    }
  };

  const handleDeleteSelected = () => {
    setCartItems((prevItems) => prevItems.filter(item => !selectedItems.includes(item.cartItemId)));
    setSelectedItems([]);
  };

  const calculateTotalPrice = useMemo(() => {
    const total = selectedItems.reduce((total, cartItemId) => {
      const item = cartItems.find(item => item.cartItemId === cartItemId);
      if (item) {
        const { toy, quantity } = item;
        const buyPrice = toy.buyPrice;
        return total + (buyPrice * quantity);
      }
      return total;
    }, 0);

    return (total - discount);
  }, [cartItems, selectedItems, discount]);

  const handleVoucherSubmit = () => {
    if (voucherCode === "DISCOUNT10") {
      const total = selectedItems.reduce((total, cartItemId) => {
        const item = cartItems.find(item => item.cartItemId === cartItemId);
        if (item) {
          const { toy, quantity } = item;
          return total + (toy.buyPrice * quantity);
        }
        return total;
      }, 0);

      setDiscount(total * 0.1); // 10% discount
      message.success("Voucher applied successfully!");
    } else {
      message.error("Invalid voucher code!");
    }
    setIsModalVisible(false);
    setVoucherCode('');
  };

  const columns = [
    {
      title: 'Select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={selectedItems.includes(record.cartItemId)}
          onChange={() => handleCheckboxChange(record.cartItemId)}
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'toy',
      key: 'image',
      render: (toy) => (
        <Image
          src={toy.imageUrl}
          alt={toy.toyName}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'toy',
      key: 'name',
      render: (toy) => (
        <Link to={`/toysaledetail/${toy.toyId}`} style={{ color: 'black', fontSize: '16px' }}>
          {toy.toyName}
        </Link>
      )
    },
    {
      title: 'Buy Price',
      dataIndex: 'toy',
      key: 'buyPrice',
      render: (toy) => <div>${toy.buyPrice}</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.cartItemId, value)}
          />
        </div>
      ),
    },
    // {
    //   title: 'Total Price',
    //   key: 'totalPrice',
    //   render: (text, record) => {
    //     const { quantity, toy } = record;
    //     const buyPrice = toy.buyPrice;
    //     return <div>${(buyPrice * quantity)}</div>;
    //   },
    // },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      key: 'Delete',
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteSelected(record.cartItemId)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '10px 120px', paddingBottom: '100px', backgroundColor: '#f3f4f6' }}>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin tip="Loading your cart..." />
        </div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
          {error.message}
        </div>
      ) : cartItems.length > 0 ? (
        <Table
          style={{
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          dataSource={cartItems}
          columns={columns}
          rowKey="cartItemId"
          pagination={false}
        />
      ) : (
        <div style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No items in the cart
        </div>
      )}

      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#ffffff',
        border: '1px solid #d9d9d9',
        borderTop: 'none',
        padding: '10px 180px',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <Row style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ marginRight: '120px', fontSize: '16px' }}>
              <GiftOutlined style={{ fontSize: '22px', color: 'red' }} /> Platform Voucher
            </span>
            <Button type="default" onClick={() => setIsModalVisible(true)} style={{ borderRadius: '4px', borderColor: '#d9d9d9', }}>
              Select or enter voucher
            </Button>
          </Row>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col>
            <Button onClick={toggleSelectAll} style={{ marginRight: '10px', borderRadius: '4px', borderColor: '#d9d9d9', fontSize: '18px' }}>
              {selectedItems.length === cartItems.length
                ? `Deselect All (${selectedItems.length})`
                : `Select All (${selectedItems.length})`}
            </Button>
            <Button type="danger" onClick={handleDeleteSelected} disabled={selectedItems.length === 0} style={{ borderRadius: '4px', fontSize: '18px' }}>
              Delete
            </Button>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Col>
              <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', fontSize: '18px' }}>
                  Total ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'})
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '26px', color: 'red', marginRight: '20px' }}>
                  ${calculateTotalPrice}
                </div>
              </Row>
              <Row style={{fontSize: '18px'}}>
                Saved
              </Row>
            </Col>
            <Col>

              <Link
                to={selectedItems.length > 0 ? "/ordersale" : "#"}
                onClick={handleCreateOrderClick} // Use the new handleCreateOrderClick function
                style={{
                  fontSize: '18px',
                  borderRadius: '4px',
                  padding: '16px 70px',
                  backgroundColor: selectedItems.length > 0 ? 'red' : '#d9d9d9', // Change color based on selection
                  color: '#fff',
                  textAlign: 'center',
                  pointerEvents: selectedItems.length > 0 ? 'auto' : 'none', // Prevent clicking when disabled
                }}
              >
                Create Order
              </Link>
            </Col>
          </Col>
        </Row>
      </div>

      <Modal
        title="Apply Voucher"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleVoucherSubmit}
        okText="Apply"
        cancelText="Cancel"
      >
        <Input
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          placeholder="Enter your voucher code"
          style={{ borderRadius: '4px' }}
        />
      </Modal>
    </div>
  );
};

export default CartSale;
