import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ForumPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'latest'
  });

  useEffect(() => {
    fetchTopics();
  }, [filters]);

  const fetchTopics = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/forum/topics?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch topics');
      const data = await response.json();
      setTopics(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to load topics');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReport = async (topicId) => {
    try {
      const response = await fetch(`/api/forum/topics/${topicId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reporterId: user.id,
          reason: 'inappropriate content'
        })
      });

      if (!response.ok) throw new Error('Failed to report topic');
      // Show success message
      alert('Topic reported successfully');
    } catch (error) {
      setError(error.message || 'Failed to report topic');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
            <p className="mt-2 text-sm text-gray-600">
              Join discussions with other community members
            </p>
          </div>
          <button
            onClick={() => navigate('/forum/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Topic
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">All Categories</option>
                  <option value="general">General Discussion</option>
                  <option value="legal">Legal Questions</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="rights">Tenant Rights</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="active">Most Active</option>
                </select>
              </div>
            </div>

            {/* Topics List */}
            <div className="divide-y divide-gray-200">
              {topics.map((topic) => (
                <div key={topic.id} className="py-6">
                  <div className="flex items-center justify-between">
                    <h3 
                      className="text-lg font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
                      onClick={() => navigate(`/forum/topic/${topic.id}`)}
                    >
                      {topic.title}
                    </h3>
                    <button
                      onClick={() => handleReport(topic.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Report
                    </button>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{topic.author}</span>
                    <span className="mx-2">&middot;</span>
                    <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">&middot;</span>
                    <span>{topic.category}</span>
                    <span className="mx-2">&middot;</span>
                    <span>{topic.replies} replies</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {topic.preview}
                  </p>
                  <div className="mt-4">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;