import React, { useEffect, useState } from "react";
import { fetchPosts, updatePost } from "../services/api"; // Ensure this API method is working
import Modal from "react-modal";

Modal.setAppElement("#root");

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts.");
      }
    };
    getPosts();
  }, []);

  const handleUpdateClick = (post) => {
    setSelectedPost(post);
    setError("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setError("");  // Reset the error message
  setIsLoading(true);  // Set loading state to true
  try {
    // Ensure updatePost is correctly implemented and handles the API request
    console.log("Updating post with data:", selectedPost);  // Log the data to be sent for debugging
    const updatedPost = await updatePost(selectedPost.id, selectedPost);

    console.log("Updated post response:", updatedPost);  // Log the server response for debugging

    if (updatedPost && updatedPost.id) {
      // Update the local state with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      setIsModalOpen(false);  // Close the modal after successful update
    } else {
      throw new Error("Failed to update post");  // Throw error if response does not contain valid post data
    }
  } catch (err) {
    console.error("Error during post update:", err);  // Log the error details
    setError("Failed to update post. Please try again.");  // Show error message to the user
  } finally {
    setIsLoading(false);  // Set loading state to false
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Blog Management Dashboard
      </h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-md">
                  {post.content}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.author}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleUpdateClick(post)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg max-w-2xl w-full mx-auto mt-20 shadow-lg border border-gray-300"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Post</h2>
        {selectedPost && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={selectedPost.title}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={selectedPost.content}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
                rows={6}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={selectedPost.author}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 ${isLoading ? "bg-blue-300 text-gray-100 cursor-not-allowed" : "bg-blue-500 text-white"} rounded-md shadow hover:bg-blue-600`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default BlogList;
