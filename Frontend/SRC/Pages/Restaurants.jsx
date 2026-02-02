import React from "react";
import { motion } from "framer-motion";

const restaurants = [
  { id: 1, name: "Spicy Grill", image: "https://content3.jdmagicbox.com/comp/pune/k7/020pxx20.xx20.161213181337.c8k7/catalogue/spice-grill-multicusine-restaurant-and-bar-amnora-mall--magarpatta-city-hadapsar-pune-restaurants-ipx2o.jpg" },
  { id: 2, name: "Chicken House", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS2QnE6lNUAiiFg6X2q2bRIFLRQTZAuK_fG-yeDtw-JEGgJF2yAlDpeXkrBHYXj66cvf0&usqp=CAU" },
  { id: 3, name: "Pasta Palace", image: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/restaurant/cover_square/3bf82ec6-d8ca-4ac3-b4c0-789eeea6c570.jpg" },
  { id: 4, name: "Burger Barn", image: "https://static1.squarespace.com/static/55de137ce4b0edc068bce14d/55de196ee4b02fcd447323fd/566201a9e4b0384b249f94e7/1506099296620/?format=1500w" },
  { id: 5, name: "Garwa", image: "https://content.jdmagicbox.com/comp/barshi/a3/020pxx20.xx20.210417031419.n6a3/catalogue/garwa-swad-diveghatavarcha-hadapsar-pune-north-indian-delivery-restaurants-o71xdmlb7k.jpg" },
  { id: 6, name: "Burger Point", image: "https://media-cdn.tripadvisor.com/media/photo-s/23/69/f4/dc/burgerpoint.jpg" },  
  { id: 7, name: "Taj", image: "https://akm-img-a-in.tosshub.com/lingo/images/story/media_bank/202312/657bdd60d1fdd-taj-mumbai-150015589-16x9.png?size=1200:675" },
  { id: 8, name: "Conrad", image: "https://www.conradpune.com/wp-content/uploads/elementor/thumbs/1-8-pswvh5j9lcihi56uuj9gun5ioocukcetkfh2rb2t1s.png" },
];

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-6">Top Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300"
          >
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
