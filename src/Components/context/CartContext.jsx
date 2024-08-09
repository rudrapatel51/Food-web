import React, { createContext, useState, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    return (
        <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for accessing cart context
export const useCart = () => {
    return useContext(CartContext);
};
