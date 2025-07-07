
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Cpu, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden hexagon-bg">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/3 right-10 md:right-1/6 hidden md:block"
      >
        <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-xl floating" style={{ animationDelay: "0s" }}></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-1/4 left-10 md:left-1/5 hidden md:block"
      >
        <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl floating" style={{ animationDelay: "0.5s" }}></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="gradient-text glow-text">Revolutionary</span> Web3 Mining Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              ChainGrid provides a secure, efficient, and user-friendly platform for cryptocurrency mining. Join thousands of miners already earning passive income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="app-button text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300">
                <Download className="mr-2 h-5 w-5" /> Download App
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 border-blue-500/50 hover:bg-blue-500/10 rounded-xl transition-all duration-300">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Hero image/animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-secondary/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-6 shadow-xl">
                {/* <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/80 rounded-2xl flex items-center justify-center rotate-12">
                  <Cpu className="h-8 w-8 text-white" />
                </div> */}
                
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">ChainGrid Mining</h3>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-background/50 rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mining Power</p>
                      <p className="text-lg font-medium">128.45 TH/s</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-green-400 text-sm">+12.5%</div>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Security Level</p>
                      <p className="text-lg font-medium">Maximum</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-blue-400 text-sm">Protected</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Mining Progress</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full mining-animation" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center rotate-slow">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 border-t-blue-500 border-l-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24"
        >
          <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">15K+</div>
            <p className="text-gray-400">Active Miners</p>
          </div>
          <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">$2.5M</div>
            <p className="text-gray-400">Mined Value</p>
          </div>
          <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99.9%</div>
            <p className="text-gray-400">Uptime</p>
          </div>
          <div className="bg-secondary/50 backdrop-blur-sm border border-blue-500/10 rounded-xl p-4 text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
            <p className="text-gray-400">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
