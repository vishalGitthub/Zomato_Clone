import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { logoutUser } from "../api/authUser";
import { useToast } from "../context/ToastContext";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
   const { success, error } = useToast();



  const foodItems = [
    { id: 1, name: "Burger", price: 129, image: "https://plus.unsplash.com/premium_photo-1684534125661-614f59f16f2e?w=600&auto=format&fit=crop&q=60" },
    { id: 2, name: "Pizza", price: 249, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, name: "Italian Pasta", price: 199, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2080&auto=format&fit=crop" },
    { id: 4, name: "Biryani", price: 299, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1000&auto=format&fit=crop&q=60" },
    { id: 5, name: "Butter Chicken", price: 349, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1170&auto=format&fit=crop" },
    { id: 6, name: "Gulab Jamun", price: 99, image: "https://www.chefadora.com/_next/image?url=https%3A%2F%2Fchefadora.b-cdn.net%2F003f0f0351967a7cb6212a8d9bfaf889_f956154e73.jpg&w=3840&q=75" },
    { id: 7, name: "Paneer Tikka", price: 199, image: "https://c.ndtvimg.com/2024-07/rvdidqqo_paneer-tikka_120x90_01_July_24.jpg" },
    { id: 8, name: "Dosa", price: 149, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACh1yWbIwNiWJOZ-8lkt9oGkf5cdMK4DV8Q&s" },
    { id: 9, name: "Lassi", price: 79, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwQlIz_DnMJ-5w_dErD9gNV_khWZuLHU3q0w&s" },
    { id: 10, name: "Samosa", price: 49, image: "https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg" },
    { id: 11, name: "Chole Bhature", price: 199, image: "https://images.hindi.news18.com/ibnkhabar/uploads/2021/06/chole-bhature.jpg" },
    { id: 12, name: "Momos", price: 129, image: "https://plus.unsplash.com/premium_photo-1673769108070-580fe90b8de7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 13, name: "Vada Pav", price: 79, image: "https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x500.jpg" },
    { id: 14, name: "Tandoori Chicken", price: 349, image: "https://plus.unsplash.com/premium_photo-1669245207961-0281fd9396eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 15, name: "Pav Bhaji", price: 179, image: "https://images.unsplash.com/photo-1619193099598-6856ec4e2a87?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 16, name: "Dal Makhani", price: 229, image: "https://img.freepik.com/free-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18712.jpg?t=st=1740754084~exp=1740757684~hmac=8f276f5d5444caa98bcfd597f70f23d0e690e12005869f702938609ba57fe807&w=1380" },
    { id: 17, name: "Jalebi", price: 99, image: "https://img.freepik.com/premium-photo/aloo-poha-with-jalebi-snack-combination-also-called-imarti-kande-pohe_466689-88544.jpg?w=740" },
    { id: 18, name: "Malai Kofta", price: 249, image: "https://img.freepik.com/premium-photo/malai-kofta-curry-is-mughlai-special-recipe-served-bowl-selective-focus_466689-33301.jpg?w=740" },
    { id: 19, name: "Pani Puri", price: 79, image: "https://img.freepik.com/premium-photo/sev-puri-indian-snack-type-chaat-popular-mumbai-pune-from-maharashtra-it-s-roadside-food-also-served-as-starter-restaurants_466689-37585.jpg?w=740" },
    { id: 20, name: "Rasgulla", price: 109, image: "https://img.freepik.com/free-photo/fresh-gourmet-fruit-bowl-wooden-leaf-plate-generative-ai_188544-8336.jpg?t=st=1740754288~exp=1740757888~hmac=e4655ed0e372f2812f1948bbef2ef13028180c5e74dfdc7868cc990193c7903d&w=1800" },
    { id: 21, name: "Fish Curry", price: 299, image: "https://img.freepik.com/free-photo/top-view-delicious-fish-meal_23-2148734691.jpg?t=st=1740754348~exp=1740757948~hmac=1e77f049550e0a72d713c48ce44d91ed5761334b8de8e7627d83af8498ccf74d&w=1380" },
    { id: 22, name: "Chicken Curry", price: 289, image: "https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151246089.jpg?t=st=1740754403~exp=1740758003~hmac=a4a7c2fd70c56b13ddda11820389a9851047ec8cc31cf7feda419d9f03b7ead7&w=740" },
    { id: 23, name: "Kebab", price: 199, image: "https://img.freepik.com/premium-photo/fresh-home-cooked-grill-fire-meat-beef-shish-kebab-with-vegetables-spices-with-barbecue-sauce-ketchup_136595-6367.jpg?w=740" },
    { id: 24, name: "Dhokla", price: 99, image: "https://img.freepik.com/premium-photo/gujarati-khaman-dhokla-made-using-chana-dal-served-with-green-chutney-selective-focus_466689-2677.jpg?w=740" },
    { id: 25, name: "Rajma Chawal", price: 159, image: "https://img.freepik.com/premium-photo/rajma-razma-is-popular-north-indian-food-consisting-cooked-red-kidney-beans-thick-gravy-with-spices-served-bowl-with-jeera-rice-green-salad_466689-67360.jpg?w=740" },
    { id: 26, name: "Misal Pav", price: 149, image: "https://img.freepik.com/premium-photo/usal-misal-pav-is-traditional-chat-food-from-maharashtra-india-served-moody-background-selective-focus_466689-22304.jpg?w=740" },
    { id: 27, name: "Hyderabadi Haleem", price: 349, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hyderabadi_Mutton_Haleem.jpg/375px-Hyderabadi_Mutton_Haleem.jpg" },
    { id: 28, name: "Shrikhand", price: 129, image: "https://img.freepik.com/premium-photo/shrikhand-is-indian-sweet-dish-made-strained-yogurt-garnished-with-dry-fruits-saffron-served-ceramic-bowl-isolated-colourful-wooden-background-selective-focus_466689-69015.jpg?w=1380" },
    { id: 29, name: "Gajar Ka Halwa", price: 149, image: "https://img.freepik.com/premium-photo/indian-popular-sweet-food-carrot-halwa_55610-2583.jpg?w=740" },
    { id: 30, name: "Phirni", price: 119, image: "https://img.freepik.com/free-photo/turkish-traditional-delight-with-walnut_140725-2457.jpg?t=st=1740755000~exp=1740758600~hmac=a44ad0af914aad89e7c140464776e8da015ae2c94579327938fdc0016c05a2fe&w=740" },
    { id: 31, name: "Modak", price: 99, image: "https://img.freepik.com/premium-photo/sweet-modak-food-offered-while-ganapati-pooja-ganesh-puja_466689-18735.jpg?w=1380" },
    { id: 32, name: "Rabri", price: 139, image: "https://img.freepik.com/premium-photo/sweet-rabdi-lachha-rabri-basundi-made-with-pure-milk-garnished-with-dry-fruits-served-bowl-moody-background-selective-focus_466689-29841.jpg?w=1380" }
  ];

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToCart = (food) => {
    let newCart = [...cart];
    const existingItem = newCart.find((item) => item.id === food.id);

    if (existingItem) {
      alert(`${food.name} is already in the cart!`);
      return;
    }

    newCart.push(food);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    alert(`${food.name} added to cart! 🛒`);
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await logoutUser(); // Call the logout API function
      Cookies.remove("user"); // Remove user from cookies
      success("Logout Successfuly.")
      setUser(null); // Reset state
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.message || "Logout failed. Please try again.");
    }
  };
  

  // Filter food items based on search term
  const filteredFood = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg py-4 px-6 flex justify-between items-center z-50">
        <h1 className="text-3xl font-bold text-red-500">Tomato</h1>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-red-500">Restaurants</Link>
          <Link to="/orders" className="text-gray-700 hover:text-red-500">Orders</Link>
          <Link to="/cart">
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-red-500 transition transform hover:scale-110" />
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 cursor-pointer focus:outline-none"
              >
                <FaUser className="text-xl" /> {user.name}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                  <div className="px-4 py-2 text-gray-700 font-semibold">{user.name}</div>
                  <div className="px-4 py-2 text-gray-600 text-sm">{user.email}</div>
                  <hr />
                  <Link to="/edit-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Edit Profile</Link>
                  <Link to="/booking-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Booking Details</Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-red-500 flex items-center gap-2">
              <FaUser className="text-xl" /> Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Delicious Food, Delivered Fast</h2>
        <p className="text-gray-600 mb-6">Find your favorite meal and enjoy hassle-free delivery</p>
        <div className="relative w-3/4 mx-auto max-w-lg">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 rounded-full text-white bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-500"
          />
          <FaSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Food Items Section */}
      <h2 className="text-3xl font-bold text-center mt-12 mb-6">Our Best Dishes 🍔</h2>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => (
            <div
              key={food.id}
              className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col"
            >
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center flex-grow">
                <h3 className="text-xl font-semibold">{food.name}</h3>
                <p className="text-red-500 text-lg font-bold">₹{food.price}</p>
              </div>
              <button
                onClick={() => addToCart(food)}
                className="mt-auto px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No food items found!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
