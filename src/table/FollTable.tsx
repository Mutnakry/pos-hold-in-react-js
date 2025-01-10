import React from 'react'
import Product from './Product'; // Import the Product component
import Cart from './Cart';
import { CartProvider } from './CartContext'; // Import the CartProvider
import Table from './Table';



function Foll() {
    return (
        <div>
            <CartProvider>
                <div className="App">
                    <Table/>
                    <Product />
                </div>
                <Cart />
            </CartProvider>
        </div>
    )
}

export default Foll