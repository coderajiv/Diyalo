"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { getCurrentUser, signOut } from "@/auth";

export default function Header() {
  const { cartCount, isLoaded } = useCart();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
    setProfileMenuOpen(false);
    window.location.href = '/';
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md fixed w-full z-20 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/tdt.jpg" alt="Logo" width={50} height={50} className="rounded-full" />
            <span className="text-xl font-semibold hidden sm:block">The Diyalo Traders</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200">Home</Link>
            <Link href="/products" className="hover:text-blue-200">Products</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar className="w-40 sm:w-64" />
            <Link href="/cart" className="relative flex items-center p-2 hover:bg-white/20 rounded-full transition">
              <FaShoppingCart size={22} />
              {isLoaded && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {currentUser && (
              <span className="text-sm hidden sm:block font-medium">
                Welcome, {currentUser.name}
              </span>
            )}

            <div className="relative" ref={profileMenuRef}>
              <button onClick={toggleProfileMenu} className="p-2 hover:bg-white/20 rounded-full transition">
                <FaUserCircle size={24} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg py-2 z-30">
                   {currentUser ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700">
                        <p>Signed in as</p>
                        <p className="font-semibold truncate">{currentUser.email}</p>
                      </div>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Login
                      </Link>
                      <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}