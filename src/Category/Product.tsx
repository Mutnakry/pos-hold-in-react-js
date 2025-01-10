import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

interface ProductType {
  proid: number;
  proname: string;
  price: number;
  discount: number;
  udit_ID: number;
  subudits?: SubUbditType[];
}

interface SubUbditType {
  subuditidid: number;
  subname: string;
  subudit_ID: number;
}

// Sample product data
const tablecheai: ProductType[] = [
  { proid: 1, proname: 'Apple', price: 2.5, discount: 5, udit_ID: 1, subudits: [{ subuditidid: 1, subname: 'Small', subudit_ID: 1 }, { subuditidid: 2, subname: 'Large', subudit_ID: 1 }] },
  { proid: 2, proname: 'Banana', price: 6.5, discount: 50, udit_ID: 2, subudits: [{ subuditidid: 1, subname: 'Small', subudit_ID: 1 }, { subuditidid: 2, subname: 'Large', subudit_ID: 1 }] },
  { proid: 4, proname: 'អាវ', price: 64.5, discount: 580, udit_ID: 2 },
];

const Product: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSubudit, setSelectedSubudit] = useState<{ [key: string]: SubUbditType | undefined }>({});

  useEffect(() => {
    // Set default subudit for each product if subudits are available
    tablecheai.forEach((product) => {
      if (product.subudits && product.subudits.length > 0) {
        setSelectedSubudit((prevState) => ({
          ...prevState,
          [product.proid]: product.subudits![0], // Set the first subudit as default
        }));
      }
    });
  }, []);

  const addProductToCart = (product: ProductType) => {
    const subudit = selectedSubudit[product.proid];
    addToCart({
      id: product.proid.toString(), // Base product id
      name: product.proname,
      price: product.price,
      quantity: 1, // Initial quantity
      subudit: subudit, // Subudit details
    });
  };


  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='text-4xl mb-6'>Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tablecheai.map((product) => (
          <div key={product.proid} className="product-card p-6 bg-white shadow-md rounded-lg text-center">
            <p className='text-xl font-semibold'>{product.proname}</p>
            <p className='text-lg text-gray-700'>Price: ${product.price}</p>
            <p className='text-lg text-gray-500'>Discount: {product.discount}%</p>
            {product.subudits && (
              <div>
                <label htmlFor={`subudit-${product.proid}`}>Choose Size:</label>
                <select
                  id={`subudit-${product.proid}`}
                  onChange={(e) => {
                    const selected = product.subudits?.find(s => s.subuditidid === Number(e.target.value));
                    if (selected) {
                      setSelectedSubudit((prevState) => ({ ...prevState, [product.proid]: selected }));
                    }
                  }}
                  value={selectedSubudit[product.proid]?.subuditidid || product.subudits[0].subuditidid} // Set the default value
                >
                  {product.subudits.map((subudit) => (
                    <option key={subudit.subuditidid} value={subudit.subuditidid}>{subudit.subname}</option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={() => addProductToCart(product)}
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
