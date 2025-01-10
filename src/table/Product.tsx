import React, { useState } from 'react';
import { useCart } from './CartContext'; // Import the custom hook to use cart context

interface ProductType {
  id: number;
  name: string;
  price: number;
  discount: number;
}

// Sample product data
const tablecheai: ProductType[] = [
  { id: 1, name: 'Apple', price: 2.5, discount: 5 },
  { id: 2, name: 'Banana', price: 6.5, discount: 50 },
  { id: 3, name: 'ABC', price: 1.5, discount: 10 },
];

const Product: React.FC = () => {
  const { addToCart } = useCart();

  // Function to add product to cart
  const addProductToCart = (product: ProductType) => {
    addToCart(product); // Pass the product directly to addToCart
  };

  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl mb-6'>Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tablecheai.map((item) => (
          <div key={item.id} className="product-card p-6 bg-white shadow-md rounded-lg text-center">
            <p className='text-xl font-semibold'>{item.name}</p>
            <p className='text-lg text-gray-700'>Price: ${item.price}</p>
            <p className='text-lg text-gray-500'>Discount: {item.discount}%</p>
            <button
              onClick={() => addProductToCart(item)}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
