import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPostPage from './components/BlogPostPage';
import AdminDashboard from './components/AdminDashboard';
import CreateUser from './components/createuser';
import Header from './components/Header';
import BlogList from './components/BlogList';
import EditBlog from './components/EditBlog';

const App = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Header placed outside of Routes for consistent display */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createprofile" element={<CreateUser />} />
        <Route path="/bloglist" element={<BlogList />} />
        <Route path="/posts/:id" element={<EditBlog />} />
        <Route path="/post/:id" element={<BlogPostPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
