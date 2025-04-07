import React from 'react';
import { HomeIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const initiatives = [
  {
    title: "Affordable Housing",
    description: "Access to quality, affordable housing solutions for low to middle-income families.",
    icon: HomeIcon,
  },
  {
    title: "Community Development",
    description: "Building stronger communities through housing initiatives and social programs.",
    icon: UserGroupIcon,
  },
  {
    title: "Economic Growth",
    description: "Promoting economic development through housing investment and job creation.",
    icon: ChartBarIcon,
  }
];

function InitiativesSection() {
  return (
    <section id="initiatives" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a365d' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}>
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Key Initiatives
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how we're making housing accessible and building sustainable communities across Gauteng.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 transform transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-block p-3 bg-primary bg-opacity-10 rounded-lg mb-6">
                <initiative.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {initiative.title}
              </h3>
              <p className="text-gray-600">
                {initiative.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InitiativesSection;