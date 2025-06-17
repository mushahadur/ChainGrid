
import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BlogSection from "@/components/BlogSection";
import DownloadApp from "@/components/DownloadApp";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <BlogSection />
      <DownloadApp />
    </div>
  );
};

export default Home;
