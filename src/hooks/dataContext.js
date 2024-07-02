import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(getCartItems());
    const [subTotal, setSubtotal] = useState(cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2));
    const [hst, setHst] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 0.13).toFixed(2));
    const [grandTotal, setGrandTotal] = useState((cartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0) * 1.13).toFixed(2));

    function getCartItems() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const filteredCartItems = cartItems.filter(item => item.id !== 'XPCZVPUZZWATLMP2ANE6NL2C');
        return filteredCartItems;
    }

    const saveDataToLocalStorage = (key, data) => {
        const now = new Date().getTime();
        const dataToStore = {
            timestamp: now,
            data: data
        };
        localStorage.setItem(key, JSON.stringify(dataToStore));
    };

    const fetchData = async () => {
        try {
            const [res1, res2, res3] = await Promise.all([
                fetch('https://northshoresoapworks.com/getItems.php'),
                fetch('https://northshoresoapworks.com/getCategories.php'),
                fetch('https://northshoresoapworks.com/getOptions.php')
            ]);

            let data = await res1.json();
            if (!data) {
                data = {
                    "objects": [],
                    "related_objects": [],
                };
            }
            const categories = await res2.json();
            const options = await res3.json();

            setData(data);
            setCategories(categories);
            setOptions(options);
            saveDataToLocalStorage('data', data);
            saveDataToLocalStorage('categories', categories);
            saveDataToLocalStorage('options', options);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const loadDataFromLocalStorage = () => {
        const dataStored = JSON.parse(localStorage.getItem('data'));
        const categoriesStored = JSON.parse(localStorage.getItem('categories'));
        const optionsStored = JSON.parse(localStorage.getItem('options'));

        if (dataStored && categoriesStored && optionsStored) {
            const now = new Date().getTime();
            const dataAge = now - dataStored.timestamp;

            if (dataAge < 24 * 60 * 60 * 1000) { // less than 24 hours
                setData(dataStored.data);
                setCategories(categoriesStored.data);
                setOptions(optionsStored.data);
                setLoading(false);
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        if (!loadDataFromLocalStorage()) {
            fetchData();
        }
    }, []);

    return (
        <DataContext.Provider value={{ data, categories, options, cartItems, setCartItems, subTotal, setSubtotal, hst, setHst, grandTotal, setGrandTotal, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };