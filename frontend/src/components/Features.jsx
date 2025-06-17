
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Cpu, BarChart3, Lock, Globe } from "lucide-react";

const featureItems = [
  {
    icon: <Cpu className="h-10 w-10 text-blue-400" />,
    title: "Optimized Mining",
    description: "Our advanced algorithms ensure maximum mining efficiency with minimal resource consumption.",
    delay: 0.1
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-400" />,
    title: "Enhanced Security",
    description: "Military-grade encryption and multi-factor authentication keep your assets safe.",
    delay: 0.2
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-400" />,
    title: "Lightning Fast",
    description: "Experience rapid transaction processing and real-time mining updates.",
    delay: 0.3
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-blue-400" />,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with detailed insights into your mining performance.",
    delay: 0.4
  },
  {
    icon: <Lock className="h-10 w-10 text-blue-400" />,
    title: "Decentralized Network",
    description: "Fully decentralized architecture ensures no single point of failure.",
    delay: 0.5
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-400" />,
    title: "Global Accessibility",
    description: "Mine from anywhere in the world with our cloud-based infrastructure.",
    delay: 0.6
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span> for Modern Mining
          </h2>
          <p className="text-lg text-gray-300">
            ChainGrid combines cutting-edge technology with user-friendly design to provide the most efficient mining experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-6 card-hover"
            >
              <div className="bg-blue-500/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
