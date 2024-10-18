import React, { useEffect, useState } from 'react';
import { getToyByID } from '../../services/staffService';

const ToyDetail = ({ toyID }) => {
    const [toy, setToy] = useState(null); // State to store the toy details
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error messages

    useEffect(() => {
        // Fetch toy details when the component mounts or toyID changes
        const fetchToy = async () => {
            try {
                setLoading(true); // Set loading to true before API call
                const toyData = await getToyByID(toyID); // Call the API
                setToy(toyData); // Set the toy data in state
            } catch (error) {
                console.error('Failed to fetch toy:', error); // Log the error
                setError(error.message || 'An error occurred'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after API call
            }
        };

        fetchToy(); // Call the fetch function
    }, [toyID]); // Dependency array - re-run effect if toyID changes

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if there is an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render toy details if the fetch is successful
    return (
        <div>
            <h1>Toy Details</h1>
            <h2>{toy.name}</h2> {/* Assuming toy has a name property */}
            <p>{toy.description}</p> {/* Assuming toy has a description property */}
            {/* Add more properties as needed */}
        </div>
    );
};

export default ToyDetail;
