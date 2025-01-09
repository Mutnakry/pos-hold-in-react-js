import React from 'react';
import { CartProvider } from './CartContext'; // Import the CartProvider
import { TableProvider } from './TableContext'; 
import Product from './Product'; // Import the Product component
import Cart from './Cart';

function App() {
  return (
    <CartProvider>
      <TableProvider>
        <div className="App">
          <Product />
        </div>
        <Cart/>
      </TableProvider>
    </CartProvider>
  );
}

export default App;
