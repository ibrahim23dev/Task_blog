import axios from 'axios';

// Set up a centralized Axios instance with default configurations
const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch a single post by ID
export const fetchPost = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error('Failed to fetch post. Please try again later.');
  }
};

// Create a new post
export const createPost = async (data) => {
  try {
    const response = await apiClient.post('/posts', data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error('Failed to create post. Please try again later.');
  }
};

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error('Failed to fetch posts. Please try again later.');
  }
};

// Update an existing post by ID
export const updatePost = async (id, updatedPostData) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, updatedPostData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error('Failed to update post. Please try again later.');
  }
};
