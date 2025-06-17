import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    fetchTags();
  }, []);

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
      
      const validPosts = postsData.filter(
        (post) =>
          post &&
          typeof post === 'object' &&
          post.id &&
          typeof post.title === 'string' &&
          typeof post.excerpt === 'string'
      );
      
      setBlogPosts(validPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error('Fetch blogs error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/public/categories`);
      
      // Since your API routes are pointing to BlogController, 
      // we need to extract categories from blog posts or handle empty response
      let categoriesData = [];
      
      // Try to get categories from response
      if (response.data.data && Array.isArray(response.data.data)) {
        categoriesData = response.data.data;
      } else if (Array.isArray(response.data)) {
        categoriesData = response.data;
      }
      
      // If categories endpoint returns blogs (due to wrong route), extract categories from blog posts
      if (categoriesData.length > 0 && categoriesData[0].title) {
        const uniqueCategories = [...new Set(
          categoriesData
            .filter(post => post.category && post.category.name)
            .map(post => post.category.name)
        )];
        setCategories(['All', ...uniqueCategories]);
      } else {
        // Handle proper categories response
        const categoryNames = categoriesData
          .filter((category) => 
            category && 
            typeof category === 'object' && 
            category.name && 
            typeof category.name === 'string' && 
            category.name.trim()
          )
          .map((category) => category.name.trim());
        
        setCategories(['All', ...new Set(categoryNames)]);
      }

    } catch (err) {
      console.error('Fetch categories error:', err);
      // Fallback: Extract categories from existing blog posts
      if (blogPosts.length > 0) {
        const fallbackCategories = [...new Set(
          blogPosts
            .filter(post => post.category && post.category.name)
            .map(post => post.category.name)
        )];
        setCategories(['All', ...fallbackCategories]);
      }
    }
  };
  
  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/public/tags`);
      
      let tagsData = [];
      
      // Try to get tags from response
      if (response.data.data && Array.isArray(response.data.data)) {
        tagsData = response.data.data;
      } else if (Array.isArray(response.data)) {
        tagsData = response.data;
      }
      
      // If tags endpoint returns blogs (due to wrong route), extract tags from blog posts
      if (tagsData.length > 0 && tagsData[0].title) {
        const uniqueTags = [...new Set(
          tagsData
            .filter(post => post.tags && Array.isArray(post.tags))
            .flatMap(post => post.tags.map(tag => tag.name || tag))
            .filter(tag => tag && typeof tag === 'string')
        )];
        setTags(uniqueTags);
      } else {
        // Handle proper tags response
        const tagNames = tagsData
          .filter((tag) => 
            tag && 
            typeof tag === 'object' && 
            tag.name && 
            typeof tag.name === 'string' &&
            tag.name.trim()
          )
          .map((tag) => tag.name.trim());
        
        setTags(tagNames);
      }
      
    } catch (err) {
      console.error('Fetch tags error:', err);
      // Fallback: Extract tags from existing blog posts
      if (blogPosts.length > 0) {
        const fallbackTags = [...new Set(
          blogPosts
            .filter(post => post.tags && Array.isArray(post.tags))
            .flatMap(post => post.tags.map(tag => tag.name || tag))
            .filter(tag => tag && typeof tag === 'string')
        )];
        setTags(fallbackTags);
      }
    }
  };

  // Extract categories and tags from blog posts if API endpoints don't work
  useEffect(() => {
    if (blogPosts.length > 0) {
      // Extract categories from blog posts
      const postCategories = [...new Set(
        blogPosts
          .filter(post => post.category && post.category.name)
          .map(post => post.category.name)
      )];
      
      if (postCategories.length > 0 && categories.length <= 1) {
        setCategories(['All', ...postCategories]);
      }
      
      // Extract tags from blog posts
      const postTags = [...new Set(
        blogPosts
          .filter(post => post.tags && Array.isArray(post.tags))
          .flatMap(post => post.tags.map(tag => tag.name || tag))
          .filter(tag => tag && typeof tag === 'string')
      )];
      
      if (postTags.length > 0 && tags.length === 0) {
        setTags(postTags);
      }
    }
  }, [blogPosts]);

  // Format date with fallback for invalid dates
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

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter((post) => {
    const title = post.title || '';
    const excerpt = post.excerpt || '';
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category?.name === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if no data is found
  const hasNoData = !isLoading && blogPosts.length === 0;

  return (
    <div className="min-h-screen pt-10 bg-gray-900 text-white">
      {/* Blog Header */}
      <section className="py-16 md:py-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">ChainGrid</span> Blog
            </h1>
            <p className="text-lg text-gray-300">
              Stay updated with the latest trends, tutorials, and insights about blockchain mining and cryptocurrency.
            </p>
          </motion.div>

          {/* Search Bar - Hidden when no data */}
          {!hasNoData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </motion.div>
          )}

          {/* Category Tabs - Hidden when no data or no categories */}
          {!hasNoData && categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3"
            >
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="w-full max-w-4xl mx-auto flex flex-wrap justify-center bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 p-1 rounded-xl">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 rounded-md"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-16 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isLoading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : hasNoData ? (
                <p className="text-center text-gray-400 text-xl">No blog posts found.</p>
              ) : paginatedPosts.length === 0 ? (
                <p className="text-center text-gray-400">No posts match your search or category.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/10 overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            alt={post.image_description || post.title || 'Blog image'}
                            src={post.image || 'https://images.unsplash.com/photo-1506110595863-8ffe8c1b6213'}
                          />
                          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            {post.category?.name || 'Uncategorized'}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-400">
                              {formatDate(post.date || post.created_at)}
                            </span>
                          </div>
                          <CardTitle className="text-xl">{post.title || 'Untitled'}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center mb-4">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{post.author?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author || 'Unknown Author'}</p>
                              <p className="text-xs text-gray-400">{post.author_role || 'Contributor'}</p>
                            </div>
                          </div>
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

              {/* Pagination - Shown only when there are posts */}
              {!hasNoData && totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'outline' : 'ghost'}
                        className={`w-10 h-10 p-0 rounded-md ${
                          currentPage === page
                            ? 'border-blue-500/20 bg-blue-500/10'
                            : 'hover:bg-blue-500/10'
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        <span>{page}</span>
                      </Button>
                    ))}
                    {totalPages > 5 && (
                      <>
                        <Button variant="ghost" className="w-10 h-10 p-0 rounded-md">
                          <span>...</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-10 h-10 p-0 rounded-md"
                          onClick={() => handlePageChange(totalPages)}
                        >
                          <span>{totalPages}</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Hidden when no data */}
            {!hasNoData && (
              <div className="w-full lg:w-1/3">
                {/* Popular Posts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-xl font-semibold mb-6">Popular Posts</h3>
                  <div className="space-y-6">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            alt={post.image_description || post.title || 'Blog image'}
                            src={post.image || 'https://images.unsplash.com/photo-1506110595863-8ffe8c1b6213'}
                          />
                        </div>
                        <div>
                          <Link
                            to={`/blog/${post.id}`}
                            className="font-medium hover:text-blue-400 transition-colors line-clamp-2"
                          >
                            {post.title || 'Untitled'}
                          </Link>
                          <p className="text-sm text-gray-400">
                            {formatDate(post.date || post.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Categories - Hidden if no categories */}
                {categories.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-6 mb-8"
                  >
                    <h3 className="text-xl font-semibold mb-6">Categories</h3>
                    <div className="space-y-3">
                      {categories.slice(1).map((category) => (
                        <div key={category} className="flex justify-between items-center">
                          <button
                            onClick={() => setActiveCategory(category)}
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                          >
                            {category}
                          </button>
                          <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                            {blogPosts.filter((post) => post.category?.name === category).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tags - Hidden if no tags */}
                {tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-6">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 10).map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;