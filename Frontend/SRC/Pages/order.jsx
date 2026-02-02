import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../pages/Header";

const orders = [
  // { id: 1, restaurant: "Pizza Palace", items: ["Pepperoni Pizza", "Garlic Bread"], total: "₹599" },
  // { id: 2, restaurant: "Burger Hub", items: ["Cheeseburger", "Fries"], total: "₹349" },
  // { id: 3, restaurant: "Sushi Delight", items: ["Salmon Sushi", "Miso Soup"], total: "₹999" },
];

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Header (Same as Home Page) */}
      <Header />

      {/* ✅ Page Title */}
      <div className="pt-24 pb-10 text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Orders
        </motion.h1>
        <p className="text-gray-600">Track your previous orders with ease</p>
      </div>

      {/* ✅ Orders Container */}
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg animate-slideUp">
        {orders.length > 0 ? (
          orders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-4 mb-4 border-b border-gray-300 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
              {/* ✅ Order Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{order.restaurant}</h2>
                <p className="text-gray-600">Items: {order.items.join(", ")}</p>
                <p className="text-gray-800 font-bold">{order.total}</p>
              </div>

              {/* ✅ View Details Button */}
              <Link
                to={`/orders/${order.id}`}
                className="text-red-500 font-semibold hover:underline transition duration-300"
              >
                View Details →
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders yet!</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
