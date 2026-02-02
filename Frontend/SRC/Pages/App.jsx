import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header";


const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-4">
    &copy; 2025 Tomato. All rights reserved.
  </footer>
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
