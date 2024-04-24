import { useContext } from "react";
import { DataContext } from "../hooks/dataContext";

export function useUpdateQuantity() {
    const { cartItems, setCartItems, setSubtotal, setHst, setGrandTotal } = useContext(DataContext);

    const updateQuantity = (itemId, action) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                if (action === "increase") {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (action === "decrease" && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });

        const updatedSubTotal = updatedCartItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0).toFixed(2);
        const updatedHst = (updatedSubTotal * 0.13).toFixed(2);
        const updatedGrandTotal = (parseFloat(updatedSubTotal) + parseFloat(updatedHst)).toFixed(2);

        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
        setSubtotal(updatedSubTotal);
        setHst(updatedHst);
        setGrandTotal(updatedGrandTotal);
    };

    return updateQuantity;
}
