import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UserGroupIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BellIcon
} from '@heroicons/react/24/outline';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [stats] = useState({
    totalUsers: 150,
    totalCourses: 25,
    totalResources: 75,
    totalForumPosts: 320,
    recentActivity: [
      { id: 1, action: 'New user registration', timestamp: '2 minutes ago' },
      { id: 2, action: 'Course completion', timestamp: '15 minutes ago' },
      { id: 3, action: 'New forum post', timestamp: '1 hour ago' },
    ]
  });

  const StatCard = ({ title, value, icon: Icon, bgColor }) => (
    <div 
      className={`${bgColor} rounded-lg shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-transform duration-200`}
      onClick={() => navigate(`/dashboard/${title.toLowerCase().replace(' ', '-')}`)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-white opacity-75" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BellIcon className="h-6 w-6 text-gray-600" />
              </button>
              <div className="ml-4 relative flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
                <span className="ml-2 text-gray-700">{user?.name || 'Admin User'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={UserGroupIcon}
            bgColor="bg-blue-500"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpenIcon}
            bgColor="bg-green-500"
          />
          <StatCard
            title="Total Resources"
            value={stats.totalResources}
            icon={DocumentTextIcon}
            bgColor="bg-purple-500"
          />
          <StatCard
            title="Forum Posts"
            value={stats.totalForumPosts}
            icon={ChatBubbleLeftRightIcon}
            bgColor="bg-red-500"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div>
                  <p className="text-gray-800 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.timestamp}</p>
                </div>
                <div className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

