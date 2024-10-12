import React, { useState } from 'react';
import { Input, Button, List, Spin, message } from 'antd';
import { SearchToyRent } from '../../services/UserServices'; // Assuming you have the function in this file

const SearchToyRentComponent = () => {
    const [keyword, setKeyword] = useState(''); // The input value for search
    const [toys, setToys] = useState([]); // The list of toys to be displayed
    const [loading, setLoading] = useState(false); // Loading state for API call
    const [error, setError] = useState(null); // Error state

    // Function to call the API and fetch toys based on the keyword
    const fetchToys = async () => {
        if (keyword.trim() === '') {
            message.warning('Please enter a keyword to search!'); // Show warning if input is empty
            return;
        }

        setLoading(true); // Set loading before API call
        setError(null);   // Reset previous errors

        try {
            const toysData = await SearchToyRent(keyword, 1, 10); // Call the API (1st page, 10 items)
            setToys(toysData); // Set toys if API call succeeds
            if (toysData.length === 0) {
                message.info('No toys found matching the search keyword.');
            }
        } catch (err) {
            setError(err.message); // Set error if API call fails
            message.error('Error fetching toy rentals. Please try again.');
        } finally {
            setLoading(false); // Stop loading after API call completes
        }
    };

    // Handle input change to set the keyword
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        fetchToys(); // Trigger the search when the button is clicked
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Search Toy Rentals</h1>

            {/* Input field for keyword search and Search button */}
            <Input
                placeholder="Enter keyword to search toys..."
                value={keyword}
                onChange={handleInputChange}
                style={{ width: '70%', marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleSearch}>
                Search
            </Button>

            {/* Display loading indicator */}
            {loading && <Spin style={{ marginTop: '20px' }} />}

            {/* Display error message */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Display the list of toys */}
            {toys && toys.length > 0 ? (
                <List
                    style={{ marginTop: '20px' }}
                    bordered
                    dataSource={toys}
                    renderItem={(toy) => <List.Item key={toy.id}>{toy.name}</List.Item>}
                />
            ) : (
                !loading && <p style={{ marginTop: '20px' }}>No toys found.</p>
            )}
        </div>
    );
};

export default SearchToyRentComponent;
