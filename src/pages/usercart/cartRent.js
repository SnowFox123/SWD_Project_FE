import React, { useEffect, useState, useMemo } from 'react';
import { Table, Spin, message, InputNumber, Checkbox, Button, Row, Col, Image } from 'antd';
import { GetCart, getToyByID } from '../../services/UserServices';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { saveOrderData } from '../../redux/orderSlice'; // Import saveOrderData action

const CartRent = () => {
  const location = useLocation();
  const { selectedToyId, rentalDuration } = location.state || {};

  const dispatch = useDispatch(); // Initialize useDispatch

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderData, setOrderData] = useState([]); // Store order data

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const items = await GetCart();
        const toyDetailsPromises = items.map(async (item) => {
          const toyDetails = await getToyByID(item.toyId);
          return { ...item, toy: toyDetails };
        });

        const cartWithToyDetails = await Promise.all(toyDetailsPromises);
        const rentalItems = cartWithToyDetails.filter((item) => item.toy.isRental);
        setCartItems(rentalItems);

        const initialQuantities = rentalItems.reduce((acc, item) => {
          acc[item.cartItemId] = item.quantity || 1; // Ensure default quantity
          return acc;
        }, {});

        setQuantities(initialQuantities);

        if (selectedToyId) {
          const selectedItem = rentalItems.find(item => item.toy.toyId === selectedToyId);
          if (selectedItem) {
            setSelectedItems([selectedItem.cartItemId]);
          }
        }
      } catch (err) {
        setError(err);
        message.error('Failed to load cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [selectedToyId]);

  useEffect(() => {
    const updatedOrderData = selectedItems.map(cartItemId => ({
      toyId: cartItems.find(item => item.cartItemId === cartItemId).toy.toyId,
      quantity: quantities[cartItemId] || 1,
    }));
    setOrderData(updatedOrderData);
  }, [selectedItems, quantities, cartItems]);

  const handleQuantityChange = (cartItemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartItemId]: value,
    }));
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
    return selectedItems.reduce((total, cartItemId) => {
      const item = cartItems.find(item => item.cartItemId === cartItemId);
      if (item) {
        const { toy } = item;
        const quantity = quantities[cartItemId] || 1;
        return total + (toy.rentPricePerDay * quantity);
      }
      return total;
    }, 0);
  }, [cartItems, selectedItems, quantities]);

  const handleCreateOrder = () => {

    dispatch(saveOrderData(orderData)); // Dispatch the saveOrderData action
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
          style={{ width: '150px', height: '150px', objectFit: 'contain' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'toy',
      key: 'name',
      render: (toy) => (
        <Link to={`/toyrentaldetail/${toy.toyId}`} style={{ color: 'black', fontSize: '16px' }}>
          {toy.toyName}
        </Link>
      )
    },
    {
      title: 'Price Per Day',
      dataIndex: 'toy',
      key: 'pricePerDay',
      render: (toy) => <div>${toy.rentPricePerDay}</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <InputNumber
          min={1}
          value={quantities[record.cartItemId]}
          onChange={(value) => handleQuantityChange(record.cartItemId, value)}
        />
      ),
    },
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
        padding: '16px 180px',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}>
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
            (<p style={{ display: 'flex',  marginRight:'10px'}}>
              <p style={{ display: 'flex', marginRight: '5px' }}>
                {selectedItems.length}
              </p>
              <p>
                {selectedItems.length > 1 ? "items" : "item"}
              </p>
            </p>)
            <Link
              to={selectedItems.length > 0 ? "/order" : "#"}
              onClick={handleCreateOrderClick} // Use the new handleCreateOrderClick function
              style={{
                fontSize: '18px',
                width: '100%',
                borderRadius: '4px',
                padding: '16px 70px',
                backgroundColor: selectedItems.length > 0 ? 'red' : '#d9d9d9', // Change color based on selection
                color: '#fff',
                textAlign: 'center',
                display: 'inline-block',
                pointerEvents: selectedItems.length > 0 ? 'auto' : 'none', // Prevent clicking when disabled
              }}
            >
              Create Order
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartRent;
