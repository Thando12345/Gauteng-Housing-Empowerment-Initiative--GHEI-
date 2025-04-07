import React from 'react';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <img className="h-8" src="/src/images/logo.png" alt="GHEI Logo" />
            <p className="text-sm">
              Empowering communities through sustainable and affordable housing solutions in Gauteng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm hover:text-white flex items-center transition-colors duration-200">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a href="#initiatives" className="text-sm hover:text-white flex items-center transition-colors duration-200">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  Initiatives
                </a>
              </li>
              <li>
                <a href="#applications" className="text-sm hover:text-white flex items-center transition-colors duration-200">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Applications
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-white flex items-center transition-colors duration-200">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <MapPinIcon className="h-4 w-4 mr-2 text-accent" />
                123 Main Road, Sandton
              </li>
              <li className="flex items-center text-sm">
                <PhoneIcon className="h-4 w-4 mr-2 text-accent" />
                +27 (0)11 123 4567
              </li>
              <li className="flex items-center text-sm">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-accent" />
                <a href="mailto:info@ghei.org.za" className="hover:text-white transition-colors duration-200">
                  info@ghei.org.za
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Office Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Gauteng Housing Empowerment Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;