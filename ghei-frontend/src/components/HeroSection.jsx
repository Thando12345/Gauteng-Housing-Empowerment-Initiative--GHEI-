import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="relative h-screen">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img
        
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/60"></div>
         {/*  <div className="absolute inset-0 bg-[url('/src/images/tooo.jpeg')] mix-blend-soft-light opacity-30 bg-repeat"></div> */}
       
      </div>
      
      {/* Hero content */}
      <div className="relative section-container h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Communities Through Housing Solutions
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Working together to create sustainable and affordable housing opportunities 
            for all residents of Gauteng.
          </p>
          <div className="flex flex-wrap gap-4">
          <Link 
  to="/#initiatives" 
  className="btn-primary" 
  style={{ color: 'blue' }} 
  onMouseEnter={e => e.target.style.color = 'orange'}
  onMouseLeave={e => e.target.style.color = 'blue'}
>
  Explore Initiatives
</Link>

            <Link 
  to="/apply" 
  className="btn-secondary" 
  style={{ color: 'green' }} 
  onMouseEnter={e => e.target.style.color = 'orange'}
  onMouseLeave={e => e.target.style.color = 'green'}
>
  Apply Now
</Link>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;