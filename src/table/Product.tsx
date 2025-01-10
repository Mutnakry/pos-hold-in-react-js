// import React, { useState } from 'react';
// import { useCart } from './CartContext'; // Import the custom hook to use cart context
// import { Link } from 'react-router-dom';

// interface ProductType {
//   id: number;
//   name: string;
//   price: number;
//   discount: number;
// }

// // Sample product data
// const tablecheai: ProductType[] = [
//   { id: 1, name: 'Apple', price: 2.5, discount: 5 },
//   { id: 2, name: 'Banana', price: 6.5, discount: 50 },
//   { id: 3, name: 'ABC', price: 1.5, discount: 10 },
// ];

// const Product: React.FC = () => {
//   const { addToCart ,clearCart} = useCart();

//   // Function to add product to cart
//   const addProductToCart = (product: ProductType) => {
//     addToCart(product);
//   };

//   return (
//     <div className='max-w-screen-lg mx-auto'>
//       <h2 className='text-4xl mb-6'>Product List</h2>

//       <Link
//       to={'/'}
//       className='bg-slate-500 p-4 rounded-lg shadow-md'
//       onClick={() => {
//         clearCart(); // Call clearCart when the link is clicked
//       }}
//     >
//       Back
//     </Link>
     
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tablecheai.map((item) => (
//           <div key={item.id} className="product-card p-6 bg-white shadow-md rounded-lg text-center">
//             <p className='text-xl font-semibold'>{item.name}</p>
//             <p className='text-lg text-gray-700'>Price: ${item.price}</p>
//             <p className='text-lg text-gray-500'>Discount: {item.discount}%</p>
//             <button
//               onClick={() => addProductToCart(item)}
//               className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Product;









import React from 'react';
import { useCart } from './CartContext'; // Import the custom hook to use cart context
import { Link, useNavigate } from 'react-router-dom';

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
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate(); // Use navigate to change the route programmatically

  // Function to add product to cart
  const addProductToCart = (productiteme: ProductType) => {
    addToCart(productiteme);
  };

  // Function to handle clear cart and navigate to the home page
  const handleClearCartAndRedirect = () => {
    clearCart(); // Clear the cart
    navigate('/'); // Navigate to the home page after clearing the cart
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-4xl mb-6">Product List</h2>

      <button
        onClick={handleClearCartAndRedirect}
        className="bg-slate-500 p-4 rounded-lg shadow-md mb-4"
      >
        Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tablecheai.map((item) => (
          <div key={item.id} className="product-card p-6 bg-white shadow-md rounded-lg text-center">
            <p className="text-xl font-semibold">{item.name}</p>
            <p className="text-lg text-gray-700">Price: ${item.price}</p>
            <p className="text-lg text-gray-500">Discount: {item.discount}%</p>
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
