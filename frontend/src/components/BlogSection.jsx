
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/public/blogs`);
        
        // Handle different response structures
        let postsData = [];
        if (response.data.data && Array.isArray(response.data.data)) {
          postsData = response.data.data;
        } else if (Array.isArray(response.data)) {
          postsData = response.data;
        }
        
        // Validate posts
        const validPosts = postsData.filter(
          (post) =>
            post &&
            typeof post === 'object' &&
            post.id &&
            typeof post.title === 'string' &&
            typeof post.excerpt === 'string'
        );
        
        // Limit to 3 posts for BlogSection
        setBlogPosts(validPosts.slice(0, 3));
        setError(null);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Fetch blogs error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [API_BASE_URL]);

  // Format date with fallback
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Latest</span> from Our Blog
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Stay updated with the latest trends, tutorials, and insights about blockchain mining and cryptocurrency.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button variant="outline" asChild>
              <Link to="/blog" className="flex items-center border-blue-500/50 hover:bg-blue-500/10">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {error && <p className="text-red-500 text-center mb-8">{error}</p>}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <article
                key={i}
                className="bg-[#1E2A3A] rounded-lg overflow-hidden max-w-md w-full flex flex-col animate-pulse-skeleton"
              >
                <div className="w-full h-48 bg-[#2A3A5A]"></div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="w-20 h-4 bg-[#2A3A5A] rounded"></div>
                  <div className="w-36 h-6 bg-[#2A3A5A] rounded"></div>
                  <div className="w-full h-16 bg-[#2A3A5A] rounded"></div>
                  <div className="w-24 h-4 bg-[#2A3A5A] rounded self-start"></div>
                </div>
              </article>
            ))}
          </div>
        ) : blogPosts.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 overflow-hidden blog-card h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      alt={post.image_description || post.title || 'Blog image'}
                      src={post.image || '/image/logo.jpg' || 'https://images.unsplash.com/photo-1606498679340-0aec3185edbd'}
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {post.category?.name || 'Uncategorized'}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="text-sm text-gray-400 mb-2">
                      {formatDate(post.date || post.created_at)}
                    </div>
                    <CardTitle className="text-xl">{post.title || 'Untitled'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-400">
                      {post.excerpt || 'No excerpt available.'}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" asChild className="p-0 hover:bg-transparent hover:text-blue-400">
                      <Link to={`/blog/${post.id}`} className="flex items-center text-blue-500">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .animate-pulse-skeleton {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;