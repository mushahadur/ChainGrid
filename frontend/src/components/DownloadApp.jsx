
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Apple, Smartphone } from "lucide-react";
import logo from '@/assets/images/logo.jpg';
import app_image from '@/assets/images/download-app.jpg';

const DownloadApp = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-[40px] blur-xl"></div>
              <div className="relative bg-secondary/80 backdrop-blur-sm border border-blue-500/20 rounded-[40px] p-6 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">
                    <img className="w-10 h-8 object-cover rounded-lg" src={logo} alt="Chain-Grid-Logo" title="Chain-Grid-Logo" />
                  </span>
                </div>
                    <span className="text-xl font-bold gradient-text">ChainGrid</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <img  
                    className="w-full h-full object-cover rounded-xl" 
                    alt="ChainGrid mobile app dashboard showing mining statistics and earnings"
                    src={app_image} />
                  
                  <div className="bg-background/50 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Daily Earnings</span>
                      <span className="text-sm font-medium text-green-400">+0.0058 GDC</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Network Status</span>
                      <span className="text-sm font-medium text-blue-400">Optimal</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                <Button
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.chaingridNetwork.chaingrid&pcampaignid=web_share",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl py-5"
                  >
                    <Download className="mr-2 h-5 w-5" /> Start Mining
                  </Button>

                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Download</span> Our Mobile App
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Take your mining operations on the go with our powerful mobile application. Monitor your earnings, adjust settings, and stay connected to your mining operations from anywhere in the world.
            </p>
            
            <div className="space-y-4 mb-8 max-w-md mx-auto lg:mx-0">
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <Smartphone className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-1">Real-time Monitoring</h3>
                  <p className="text-gray-400 text-sm">Track your mining performance and earnings in real-time with detailed analytics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-1">Remote Control</h3>
                  <p className="text-gray-400 text-sm">Adjust mining settings, start or stop operations, and manage your account on the go.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-1">Instant Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive alerts for important events, earnings milestones, and system updates.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.chaingridNetwork.chaingrid&pcampaignid=web_share",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    } className="app-button bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl py-6 px-8">
                <Smartphone className="mr-2 h-5 w-5" /> Android App
              </Button>
              <Button nonClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.chaingridNetwork.chaingrid&pcampaignid=web_share",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    } className="app-button bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl py-6 px-8">
                <Apple className="mr-2 h-5 w-5" /> iOS App
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
