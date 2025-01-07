import React, { useState , useEffect} from 'react';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { onAuthStateChanged , getAuth} from "firebase/auth";
import {app} from '../../firebase.js';
import logo from "../../Assets/logo.jpg";
import cart from "../../Assets/cart.jpg";
import user from "../../Assets/user.webp";
import { useSelector } from 'react-redux';

const auth = getAuth(app);

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCart = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/cart'); // Navigate to the cart page
      } else {
        navigate('/signup'); // Navigate to the signup page
      }
    });
  };

  return (
    <nav className="bg-zinc-50 sticky top-0 z-1 shadow-md py-2">
      <div className="mx-2 max-w-full px-1 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img className="h-12 w-auto rounded-xl" src={logo} alt="Your Company" />
          </div>
          <div className="hidden sm:flex sm:space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Mens"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/Womens"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  : "rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
              }
            >
              Women
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
           
            <button onClick={handleCart} type="button" className="relative p-1 text-gray-400 hover:animate-zoomOut">
              <img className="h-10 w-10 rounded-full" src={cart} alt="Cart" />
              <div className="absolute top-0.5 right-1  transform -translate-x-1 -translate-y-1 bg-opacity-100 text-black text-center  rounded">{totalItems}</div>
            </button>
            
            <Link to="/Login">
               <button type="button" className="relative p-1 text-gray-400 hover:animate-zoomOut">
               <img className="h-10 w-10 rounded-full" src={user} alt="User" />
               </button>
            </Link>
            <button
              type="button"
              className="sm:hidden p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Mens"
              className={({ isActive }) =>
                isActive
                  ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/Womens"
              className={({ isActive }) =>
                isActive
                  ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            >
              Women
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
