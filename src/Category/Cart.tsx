import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart, removeFromCart, holdOrder, heldOrders, restoreHeldOrder, saveAndHoldOrder, clearHeldOrders, increaseQuantity, decreaseQuantity } = useCart();



    return (
        <div className='max-w-screen-lg mx-auto grid grid-cols-2 gap-4'>
            <div className='bg-gray-300 text-center'>
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <p>{item.name} - ${item.price} - Quantity: {item.quantity}</p>
                                <p>{item.subudit && `Size: ${item.subudit.subname}`}</p>
                                <button onClick={() => increaseQuantity(item.id)} className='text-white bg-green-500 rounded-lg p-2'>+</button>
                                <button onClick={() => decreaseQuantity(item.id)} className='text-white bg-yellow-500 rounded-lg p-2'>-</button>

                                <button onClick={() => removeFromCart(item.id)} className='text-white bg-red-500 rounded-lg p-2'>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="space-x-4">
                    <button className="bg-green-300 p-2" onClick={saveAndHoldOrder}>Save</button>
                    <button className="bg-green-300 p-2" onClick={holdOrder}>Hold Order</button>
                </div>
            </div>

            <div className='bg-purple-300 text-center'>
                <h3>Held Orders</h3>
                {heldOrders.length === 0 ? (
                    <p>No held orders.</p>
                ) : (
                    <ul>
                        {heldOrders.map((order, index) => (
                            <li key={index} className='p-5 bg-green-300 m-2 rounded-xl'>
                                <p>Order {index + 1}:</p>
                                <ul>
                                    {order.map((item) => (
                                        <li key={item.id}>
                                            {item.name} - ${item.price} - Quantity: {item.quantity}
                                            {item.subudit && ` - Size: ${item.subudit.subname}`}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => restoreHeldOrder(order)} className='bg-blue-500 py-1 px-4 rounded-lg'>Restore to Cart</button>
                            </li>
                        ))}
                        <div className="space-x-4 mt-4">
                            <button className="bg-green-300 rounded-md p-2" onClick={clearHeldOrders}>Clear Held Orders</button>
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Cart;
