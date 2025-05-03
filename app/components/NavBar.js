"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const NavBar = () => {
    const [isMenuOpen, setmenueopen] = useState(false); // State to manage menu open/close
    const toggleMenu = () => setmenueopen(!isMenuOpen); // Function to toggle menu state

  return (
    <div className="flex "> {/* Flexbox for horizontal layout */}
        <img src="./logo.png" alt="Logo" className="h-12 ml-5 mt-2 mr-20  " /> {/* Logo */}
        <button className="md:hidden absolute top-2 right-6 z-50 " onClick={toggleMenu}>
            <img src="./menus.png" alt="Menu" className="h-8 w-8 mt-2" /> {/* Hamburger menu icon */}
        </button>
        <ul className="hidden md:flex ml-auto space-x-10 mr-28 my-5 text-black"> {/* Flexbox for horizontal layout align to right */}
            <li className="text-sm  hover:text-blue-500 transition duration-200 ease-in-out">
                <Link href="/">Home</Link> {/* Link to Home page */}
            </li>
            <li className="text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                <Link href="/allCountries">All Countries</Link> {/* Link to All Countries page */}
            </li>
            <li className="text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                <Link href="/recent">Recent Searches</Link> {/* Link to Favourites page */}
            </li>
            <li className="text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                <Link href="/about">About Us</Link> {/* Link to About Us page */}
            </li>
        </ul>

        {isMenuOpen && (
        <ul className="flex flex-col items-center space-y-5 absolute top-16 right-0 bg-white p-5 shadow-md z-40 w-full text-m">
            <li className="font-bold text-gray-800 "onClick={() => setIsMenuOpen(false)}>
                <Link href="/">Home</Link> {/* Link to Home page */}
            </li>
            <li className="font-bold text-gray-800 "onClick={() => setIsMenuOpen(false)}>
                <Link href="/allCountries">All Countries</Link> {/* Link to All Countries page */}
            </li>
            <li className="font-bold text-gray-800 "onClick={() => setIsMenuOpen(false)}>
                <Link href="/recent">Recent Searches</Link> {/* Link to Favourites page */}
            </li>
            <li className="font-bold text-gray-800 "onClick={() => setIsMenuOpen(false)}>
                <Link href="/about">About Us</Link> {/* Link to About Us page */}
            </li>
        </ul>
        )}
    </div>
  );
}
export default NavBar; 