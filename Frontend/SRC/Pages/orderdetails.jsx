import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const orders = [
  // { id: 1, restaurant: "Pizza Palace", items: ["Pepperoni Pizza", "Garlic Bread"], total: "$25.99", status: "Delivered" },
  // { id: 2, restaurant: "Burger Hub", items: ["Cheeseburger", "Fries"], total: "$15.49", status: "Preparing" },
  // { id: 3, restaurant: "Sushi Delight", items: ["Salmon Sushi", "Miso Soup"], total: "$30.99", status: "On the way" },
];

const OrderDetails = () => {
  const { id } = useParams();
  const order = orders.find((order) => order.id === parseInt(id));

  if (!order) {
    return <p className="text-center text-gray-500">Order not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <motion.div 
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-red-500 text-center mb-4">
          Order Details
        </h1>
        <p className="text-xl font-semibold">{order.restaurant}</p>
        <p className="text-gray-600">Items: {order.items.join(", ")}</p>
        <p className="text-lg font-bold mt-2">{order.total}</p>
        <p className={`mt-4 p-2 rounded-lg text-white w-fit ${order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"}`}>
          {order.status}
        </p>
      </motion.div>
    </div>
  );
};

export default OrderDetails;
