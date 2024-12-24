import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../services/api';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content, author };

    try {
      if (isEditing) {
        await updatePost(editingId, data);
      } else {
        await createPost(data);
      }

      // Reset form state
      setTitle('');
      setAuthor('');
      setContent('');
      setIsEditing(false);
      setEditingId(null);

      // Redirect to blog list page
      navigate('/bloglist');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded shadow-md">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Admin Dashboard
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            placeholder="Enter the author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
