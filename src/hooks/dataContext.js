import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);
    const [subTotal, setSubtotal] = useState(cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2));
    const [hst, setHst] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 0.13).toFixed(2));
    const [grandTotal, setGrandTotal] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 1.13).toFixed(2));

    useEffect(() => {
        // Fetch data when component mounts
        Promise.all([
            fetch('http://northshoresoapworks.com/getItems.php'),
            fetch('http://northshoresoapworks.com/getCategories.php')
        ])
            .then(async ([res1, res2]) => {
                let data = await res1.json();
                if (!data) {
                    data = {
                        "objects": [],
                        "related_objects": [],
                    }
                }
                const categories = await res2.json();
                setData(data);
                setCategories(categories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []); // Empty dependency array ensures fetch is only done once

    if (loading) {
        return (
            <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
                <div className="spinner-border text-dark" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <DataContext.Provider value={{ data, categories, cartItems, setCartItems, subTotal, setSubtotal, hst, setHst, grandTotal, setGrandTotal }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };