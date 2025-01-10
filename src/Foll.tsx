import React from 'react'
import { TableProvider } from './TableContext';
import Product from './Product'; // Import the Product component
import Cart from './Cart';
import { CartProvider } from './CartContext'; // Import the CartProvider



function Foll() {
    return (
        <div>
            <CartProvider>
                <div className="App">
                    <Product />
                </div>
                <Cart />
            </CartProvider>
        </div>
    )
}

export default Foll