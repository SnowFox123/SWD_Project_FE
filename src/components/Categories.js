// CategoryList.js

import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/staffService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // State to hold the categories
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to hold any errors

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories); // Set the fetched categories
            } catch (error) {
                setError(error); // Set any error encountered during fetching
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchCategories(); // Call the fetch function when the component mounts
    }, []); // Empty dependency array means this effect runs only once

    // Handle loading state
    if (loading) {
        return <p>Loading categories...</p>;
    }

    // Handle error state
    if (error) {
        return <p>Error fetching categories: {error.message}</p>;
    }

    // Render the categories in a list
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.categoryId}>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
