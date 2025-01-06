import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart} from "../../Features/cartSlice"; 

function CartPage() {
  const dispatch = useDispatch();

  // Access cart data from Redux and ensure it's always an array
  const cartItems = useSelector((state) => state.cart || []);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}`}
                className="border p-4 flex justify-between items-center"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                {/* Product Details */}
                <div className="flex flex-col w-1/2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Size: {item.size}</p>
                  <p>Price: ₹ {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
               
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ id: item.id, size: item.size }))
                  }
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-4 text-right">
            <h3 className="text-2xl font-semibold">Total: ₹ {totalPrice}</h3>
            <Link to='/Payment'><button className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded mt-4">
              Checkout
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
