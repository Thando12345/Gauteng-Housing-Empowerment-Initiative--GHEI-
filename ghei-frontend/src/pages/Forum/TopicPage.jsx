import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function TopicPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopic();
    fetchComments();
  }, [id]);

  const fetchTopic = async () => {
    try {
      const response = await fetch(`/api/forum/topics/${id}`);
      if (!response.ok) throw new Error('Failed to fetch topic');
      const data = await response.json();
      setTopic(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to load topic');
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/forum/topics/${id}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setError(error.message || 'Failed to load comments');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/forum/topics/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: newComment,
          authorId: user.id
        })
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const data = await response.json();
      setComments(prev => [...prev, data]);
      setNewComment('');
    } catch (error) {
      setError(error.message || 'Failed to post comment');
    }
  };

  const handleReport = async (commentId) => {
    try {
      const response = await fetch(`/api/forum/comments/${commentId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reporterId: user.id,
          reason: 'inappropriate content'
        })
      });

      if (!response.ok) throw new Error('Failed to report comment');
      alert('Comment reported successfully');
    } catch (error) {
      setError(error.message || 'Failed to report comment');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!topic) return <div>Topic not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
              <button
                onClick={() => navigate('/forum')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to Forum
              </button>
            </div>

            <div className="prose max-w-none">{topic.content}</div>

            <div className="mt-6 flex items-center text-sm text-gray-500">
              <span>{topic.author}</span>
              <span className="mx-2">&middot;</span>
              <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">&middot;</span>
              <span>{topic.category}</span>
            </div>

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
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="prose max-w-none">{comment.content}</div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>{comment.author}</span>
                      <span className="mx-2">&middot;</span>
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => handleReport(comment.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <div>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;