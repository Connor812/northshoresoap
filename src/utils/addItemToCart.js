// cartUtils.js
export const addItemToCart = (id, name, soapIndex, price, imageUrl, description) => {

    let quantity = document.querySelector(`.${soapIndex}Input`).value;
    const cartBtn = document.getElementById(`soap-buy-btn-${soapIndex}`);

    const addedToCartBtn = `<svg width="30" height="30" viewBox="0 0 16 16">
    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
  </svg>`;

    const addToCartBtn = ` <svg width="30" height="30" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
</svg>`;

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
            imageUrl,
            description
        };
        existingCartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    cartBtn.innerHTML = addedToCartBtn;
    cartBtn.disabled = true;

    setTimeout(() => {
        cartBtn.innerHTML = addToCartBtn;
        cartBtn.disabled = false;
    }, 3000);

};