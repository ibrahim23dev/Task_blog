import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import { useInView } from "react-intersection-observer"; // For scroll animations

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-10">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Solruf Blog
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

// Card Component
const Card = ({ post }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <a
      href={`/post/676453271dd7d40ec9a3c1e9`}
      ref={ref}
      className={`transform transition-all duration-500 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } group block bg-gradient-to-br from-gray-50 to-white border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2`}
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3">{post.content}</p>
        <p className="text-sm text-gray-500 font-medium">By: {post.author}</p>
      </div>
      <div className="mt-4">
        <span className="text-blue-500 font-semibold group-hover:underline">
          Read More →
        </span>
      </div>
    </a>
  );
};

export default HomePage;
