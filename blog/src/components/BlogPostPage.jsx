import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../services/api';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetchPost(id);
      setPost(response.data);
    };
    getPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div className="prose">{post.content}</div>
    </div>
  );
};

export default BlogPostPage;
