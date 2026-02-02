import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, change) => {
    let updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* ✅ FLEXBOX FIX TO KEEP ITEMS IN A SINGLE LINE */}
          <div className="flex flex-wrap gap-6 justify-between">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center w-[250px] transition-all hover:scale-105">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-3" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-red-500 text-lg font-bold">₹{item.price}</p>

                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    disabled={item.quantity === 1}
                  >
                    ➖
                  </button>
                  <span className="text-lg font-semibold">{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    ➕
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition"
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Billing Summary 🧾</h2>
            <p className="text-lg">Total Items: <span className="font-bold">{totalItems}</span></p>
            <p className="text-lg">Total Price: <span className="font-bold text-green-600">₹{totalPrice}</span></p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-md hover:bg-gray-600 transition"
            >
              Clear Cart 🗑
            </button>
            <Link to="/checkout">
              <button className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition">
                Proceed to Checkout 💳
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
