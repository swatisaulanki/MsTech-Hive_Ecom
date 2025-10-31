import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'How to Build a Modern E-commerce Website',
    description: 'Learn how to create a fully functional e-commerce site using modern technologies like React and Node.js.',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'April 20, 2025',
  },
  {
    id: 2,
    title: 'The Future of Web Development in 2025',
    description: 'Discover the most promising technologies and trends shaping the future of web development.',
    image: 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'April 18, 2025',
  },
  {
    id: 3,
    title: 'Understanding React Hooks',
    description: 'A comprehensive guide to React hooks and how to use them to manage state and side effects in functional components.',
    image: 'https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'April 15, 2025',
  },
  // Add more posts as needed
];

const BlogPage = () => {
  return (
    <div className="container mx-auto bg-custom-color2 px-6 py-16 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Blog Posts Section */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-semibold  text-white font-poppins mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="hidden md:block bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Posts</h3>
          <ul className="space-y-4">
            {blogPosts.slice(0, 3).map((post) => (
              <li key={post.id} className="flex items-center space-x-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{post.title}</h4>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/electronics" className="text-blue-500 hover:text-blue-700">Electronics</Link>
              </li>
              <li>
                <Link to="/categories/clothing" className="text-blue-500 hover:text-blue-700">Clothing</Link>
              </li>
              <li>
                <Link to="/categories/books" className="text-blue-500 hover:text-blue-700">Books</Link>
              </li>
              <li>
                <Link to="/categories/beauty" className="text-blue-500 hover:text-blue-700">Beauty</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
