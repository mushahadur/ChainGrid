import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/public/blogs/${id}`);
        
        // Check if the response was successful
        if (response.status !== 200) {
          throw new Error('Failed to fetch blog post');
        }
        
        // For axios, data is directly available in response.data
        setPost(response.data.data);
      } catch (err) {
        // Handle both axios errors and custom errors
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get author initials
  const getAuthorInitials = (authorName) => {
    if (!authorName) return 'A';
    return authorName.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <Link to="/blog" className="text-blue-400 hover:text-blue-500">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Post not found
  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Blog post not found</p>
          <Link to="/blog" className="text-blue-400 hover:text-blue-500">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Blog Post Header */}
      <section className="py-16 md:py-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-500 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl overflow-hidden">
              {/* Featured Image */}
              {post.image && (
                <div className="h-80 relative">
                  <img  
                    className="w-full h-full object-cover" 
                    alt={post.title}
                    src={post.image}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1606498679340-0aec3185edbd";
                    }}
                  />
                  {post.category && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category.name}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
                  </div>
                  {post.author && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-400">{post.author}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                
                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-lg text-gray-300 mb-8">{post.excerpt}</p>
                )}
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        <Tag className="h-3 w-3 inline mr-1" />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Content */}
                <div 
                  className="prose prose-invert prose-blue max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-gray-800 prose-blockquote:border-blue-500 prose-blockquote:text-gray-300" 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                
                {/* Author Bio */}
                {post.author && (
                  <div className="mt-12 pt-8 border-t border-blue-500/10">
                    <div className="flex items-start">
                      <Avatar className="h-16 w-16 mr-4">
                        {post.author_image ? (
                          <AvatarImage src={post.author_image} alt={post.author} />
                        ) : (
                          <AvatarFallback className="text-lg">
                            {getAuthorInitials(post.author)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{post.author}</h3>
                        {post.author_role && (
                          <p className="text-sm text-blue-400 mb-2">{post.author_role}</p>
                        )}
                        {post.author_bio && (
                          <p className="text-gray-400">{post.author_bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Share */}
                <div className="mt-8 pt-8 border-t border-blue-500/10">
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center">
                      <Share2 className="h-4 w-4 mr-2" /> Share this article
                    </span>
                    <div className="flex space-x-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-10 w-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;