import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './Search/SearchBar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  PhoneIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/solid';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/src/images/logo.png" alt="GHEI Logo" />
              <h1 className="ml-3 text-white font-heading text-lg md:text-xl hidden md:block">
                Gauteng Housing Empowerment Initiative
              </h1>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              <Link to="/" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link to="/initiatives" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <BuildingOfficeIcon className="h-5 w-5 mr-1" />
                Initiatives
              </Link>
              <Link to="/apply" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                Apply Now
              </Link>
              <Link to="/contact" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <PhoneIcon className="h-5 w-5 mr-1" />
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-400 pl-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <UserIcon className="h-5 w-5 mr-1" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="bg-white text-primary hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="flex items-center text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </a>
            <a href="#initiatives" className="flex items-center text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <BuildingOfficeIcon className="h-5 w-5 mr-2" />
              Initiatives
            </a>
            <a href="#applications" className="flex items-center text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Applications
            </a>
            <a href="#contact" className="flex items-center text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


