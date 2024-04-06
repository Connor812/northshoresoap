// cartUtils.js
export const addItemToCart = (id, name, quantity, price, imageUrl) => {
    console.log(id, name, quantity, price, imageUrl);

    quantity = parseInt(quantity) || 1;

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = existingCartItems.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        existingCartItems[existingItemIndex].quantity += parseInt(quantity);
    } else {
        const newItem = {
            id,
            name,
            quantity: quantity,
            price,
            imageUrl
        };
        existingCartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    alert('Item added to cart successfully!');
};