import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function CourseContent() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch course');
      const data = await response.json();
      setCourse(data);
      setActiveModule(data.currentModule || data.modules[0]);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to load course');
      setLoading(false);
    }
  };

  const handleModuleCompletion = async () => {
    try {
      const response = await fetch(`/api/courses/${id}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          moduleId: activeModule.id,
          completed: true
        })
      });

      if (!response.ok) throw new Error('Failed to update progress');

      // Move to next module or show completion
      const currentIndex = course.modules.findIndex(m => m.id === activeModule.id);
      if (currentIndex < course.modules.length - 1) {
        setActiveModule(course.modules[currentIndex + 1]);
      } else {
        // Course completed
        const certificateResponse = await fetch(`/api/courses/${id}/certificate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user.id
          })
        });

        if (certificateResponse.ok) {
          navigate(`/courses/${id}/certificate`);
        }
      }
    } catch (error) {
      setError(error.message || 'Failed to update progress');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">{course.title}</h2>
              <div className="mt-3">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="text-xs font-semibold text-indigo-600">
                      {course.progress}% Complete
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {course.modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module)}
                  className={`${
                    activeModule?.id === module.id
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group w-full flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                >
                  <span className="truncate">{module.title}</span>
                  {module.completed && (
                    <span className="ml-auto">
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {error && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                  </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {activeModule?.title}
                    </h3>

                    {activeModule?.videoUrl && (
                      <div className="aspect-w-16 aspect-h-9 mb-6">
                        <iframe
                          src={activeModule.videoUrl}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    )}

                    <div className="prose max-w-none">
                      {activeModule?.content}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => {
                          const currentIndex = course.modules.findIndex(
                            m => m.id === activeModule.id
                          );
                          if (currentIndex > 0) {
                            setActiveModule(course.modules[currentIndex - 1]);
                          }
                        }}
                        disabled={
                          course.modules.findIndex(m => m.id === activeModule.id) === 0
                        }
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleModuleCompletion}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {activeModule?.completed ? 'Completed' : 'Mark as Complete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;