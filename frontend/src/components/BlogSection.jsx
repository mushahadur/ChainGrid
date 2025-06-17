
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web3 Mining in 2025",
    excerpt: "Explore how blockchain mining is evolving with new technologies and what to expect in the coming years.",
    date: "May 28, 2025",
    category: "Technology",
    imageDescription: "Futuristic mining rig with holographic displays"
  },
  {
    id: 2,
    title: "How to Optimize Your Mining Setup",
    excerpt: "Learn the best practices for configuring your mining hardware and software for maximum efficiency.",
    date: "May 20, 2025",
    category: "Tutorials",
    imageDescription: "Optimized mining setup with multiple GPUs"
  },
  {
    id: 3,
    title: "Understanding Blockchain Consensus Mechanisms",
    excerpt: "A deep dive into different consensus algorithms and how they impact mining profitability.",
    date: "May 15, 2025",
    category: "Education",
    imageDescription: "Abstract visualization of blockchain consensus mechanism"
  }
];

const BlogSection = () => {
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
                    alt={post.imageDescription}
                   src="https://images.unsplash.com/photo-1606498679340-0aec3185edbd" />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="text-sm text-gray-400 mb-2">{post.date}</div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-gray-400">
                    {post.excerpt}
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
      </div>
    </section>
  );
};

export default BlogSection;
