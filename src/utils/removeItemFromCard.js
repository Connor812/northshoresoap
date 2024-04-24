
export function removeItem(itemElememt, itemId, cartItems, setCartItems, setSubtotal, setHst, setGrandTotal) {

    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    const updatedSubTotal = updatedCartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2);
    const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
    const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setSubtotal(updatedSubTotal);
    setHst(updatedHst);
    setGrandTotal(updatedGrandTotal);
}
