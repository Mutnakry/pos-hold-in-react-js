

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types for the cart item and order
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subudit?: SubUbditType; // Add subudit details to the cart item
}



interface CartContextType {
  cart: CartItem[];
  heldOrders: CartItem[][];
  addToCart: (product: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  holdOrder: () => void;
  restoreHeldOrder: (order: CartItem[]) => void;
  saveAndHoldOrder: () => void;
  clearHeldOrders: () => void;
}

// Create a Context for the Cart
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component to wrap around your app and provide cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Retrieve saved cart and held orders from localStorage
  const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
  const savedHeldOrders = JSON.parse(localStorage.getItem('heldOrders') || '[]') as CartItem[][];

  const [cart, setCart] = useState<CartItem[]>(savedCart); // Initialize cart state with saved data
  const [heldOrders, setHeldOrders] = useState<CartItem[][]>(savedHeldOrders); // Initialize held orders state with saved data

  // Store cart and held orders in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('heldOrders', JSON.stringify(heldOrders)); // Save held orders to localStorage
  }, [heldOrders]);

  // Function to add product to cart
  // const addToCart = (product: CartItem) => {
  //   setCart((prevCart) => {
  //     const productExists = prevCart.find((item) => item.id === product.id);
  //     if (productExists) {
  //       return prevCart.map((item) =>
  //         item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };


  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // Create a unique identifier that includes the product id and subudit id
      const uniqueId = `${product.id}-${product.subudit?.subuditidid || 'no-subudit'}`;

      // Check if the product with the specific subudit already exists in the cart
      const productExists = prevCart.find((item) => item.id === uniqueId);

      if (productExists) {
        // If it exists, update the quantity
        return prevCart.map((item) =>
          item.id === uniqueId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // If it doesn't exist, add it to the cart with the unique identifier
        return [...prevCart, { ...product, id: uniqueId, quantity: 1 }];
      }
    });
  };


  // Function to remove product from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Function to hold the current cart order and clear the cart
  const holdOrder = () => {
    setHeldOrders((prevHeldOrders) => [...prevHeldOrders, cart]); // Save current cart to held orders
    setCart([]); // Clear the cart after holding the order
  };

  // Function to restore a held order to the cart
  const restoreHeldOrder = (order: CartItem[]) => {
    setCart(order); // Restore the held order to the cart
    setHeldOrders((prevHeldOrders) => prevHeldOrders.filter((o) => o !== order)); // Remove the order from held orders
  };

  // Function to save the order, clear cart, and hold the order
  const saveAndHoldOrder = () => {
    setCart([]); // Clear the cart
    alert('Save success');
  };

  // New function to clear all held orders
  const clearHeldOrders = () => {
    setHeldOrders([]); // Clear all held orders
    alert('Held orders cleared');
  };

  const increaseQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        increaseQuantity,
        decreaseQuantity,
        cart,
        heldOrders,
        addToCart,
        removeFromCart,
        holdOrder,
        restoreHeldOrder,
        saveAndHoldOrder,
        clearHeldOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
