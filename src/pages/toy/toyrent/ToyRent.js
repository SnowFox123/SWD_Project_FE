import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Spin, message, Input, Button, Select } from 'antd';
import { ViewToyRent, SearchToyRent, AddToCart2, SortToyRent } from '../../../services/UserServices';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './card.css';

const { Search } = Input;
const { Option } = Select;

const ToyRent = () => {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [sortOption, setSortOption] = useState(''); // State for sorting option

  useEffect(() => {
    const fetchToys = async () => {
      try {
        setLoading(true);
        let response;

        if (keyword.trim()) {
          // If a keyword is provided, search for toys and pass the sort option
          response = await SearchToyRent(keyword, pageIndex , pageSize);
        } else if (sortOption) {
          // If no keyword but a sort option is provided, sort the toys
          response = await SortToyRent(sortOption, pageIndex - 1, pageSize);
        } else {
          // If neither search nor sort is provided, fetch all toys
          response = await ViewToyRent(pageIndex - 1, pageSize);
        }

        if (response) {
          setToys(response.items || response); // Assuming response.items contains the list of toys
          setTotalItemsCount(response.totalItemsCount || response.length); // Assuming the total item count is provided or using the array length
        } else {
          setToys([]);
        }
      } catch (error) {
        message.error('Error fetching toy rental data.');
        console.error('Error fetching toy rental data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToys();
  }, [pageIndex, pageSize, keyword, sortOption]); // Reload toys when pageIndex, pageSize, keyword, or sortOption changes

  const onPageChange = (page) => {
    setPageIndex(page);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      setKeyword(value);
      setPageIndex(1); // Reset to the first page on a new search
    } else {
      setKeyword(''); // Clear keyword if the input is empty
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value); // Update the sort option
    setPageIndex(1); // Reset to the first page on a new sort
  };

  const handleAddToCart = async (toyId, quantity = 1) => {
    if (quantity < 1 || quantity > 2147483647) {
      toast.error('Invalid quantity. Please enter a value between 1 and 2147483647.');
      return;
    }

    try {
      setAddingToCart((prevState) => ({ ...prevState, [toyId]: true }));

      const response = await AddToCart2(toyId, quantity);

      if (response) {
        toast.success('Item added to cart successfully!');
      } else {
        throw new Error('Failed to add item to cart.');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add item to cart.');
      console.error('Add to cart error:', error);
    } finally {
      setAddingToCart((prevState) => ({ ...prevState, [toyId]: false }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginBottom: '20px', width: '600px' }}>
          <Search
            placeholder="Search for toys"
            enterButton="Search"
            size="large"
            className="custom-search"
            onSearch={handleSearch}
          />
        </div>

        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
          <Select
            placeholder="Sort by"
            onChange={handleSortChange}
            style={{ width: 200 }}
          >
            <Option value="name_asc">Name Ascending</Option>
            <Option value="name_desc">Name Descending</Option>
            <Option value="price_asc">Price Ascending</Option>
            <Option value="price_desc">Price Descending</Option>
          </Select>
        </div>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          <Row gutter={60}>
            {toys && toys.length > 0 ? (
              toys.map((toy) => (
                <Col key={toy.toyId} span={6}>
                  <Card className="toy-card" hoverable={true}>
                    <Link to={`/toyrentaldetail/${toy.toyId}`} style={{ textDecoration: 'none' }}>
                      <img
                        className="toy-card__image"
                        alt={toy.toyName}
                        src={toy.imageUrl}
                      />
                      <h4 className="toy-card__name">{toy.toyName}</h4>
                      <div className="toy-card__price">
                        <span className="price-current">${toy.rentPricePerDay}/Day</span>
                      </div>
                    </Link>

                    <Button
                      type="primary"
                      onClick={() => handleAddToCart(toy.toyId, 1)}
                      className="add-to-cart-btn"
                      loading={addingToCart[toy.toyId]} // Loading state for this specific toy
                    >
                      {addingToCart[toy.toyId] ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No toys found.</p>
            )}
          </Row>

          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={totalItemsCount}
            onChange={onPageChange}
            style={{ textAlign: 'center', marginTop: '20px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ToyRent;
