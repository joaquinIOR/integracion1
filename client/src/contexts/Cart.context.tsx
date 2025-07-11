import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CartContextValue {
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (index: number) => void; // <-- AÑADE ESTA LÍNEA
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

const removeFromCart = (indexToRemove: number) => {
    setCartItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};