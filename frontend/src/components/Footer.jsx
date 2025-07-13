
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '@/assets/images/logo.jpg';
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm border-t border-blue-500/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
              <img className="w-10 h-8 object-cover rounded-lg" src={logo} alt="Chain-Grid-Logo" title="Chain-Grid-Logo" />
              </div>
              <span className="text-xl font-bold gradient-text">ChainGrid</span>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionary web3 mining platform that allows users to mine cryptocurrency efficiently and securely.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/ChainGrid-Network-61557825997971/" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/Chain_Grid" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-semibold text-lg mb-6">Quick Links</p>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
              <a
                  href="https://play.google.com/store/apps/details?id=com.chaingridNetwork.chaingrid&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Download App
                </a>
                </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-semibold text-lg mb-6">Resources</p>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="text-gray-400 hover:text-blue-400 transition-colors">Documentation</Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-gray-400 hover:text-blue-400 transition-colors">Whitepaper</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-400 hover:text-blue-400 transition-colors">Tutorials</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-blue-400 transition-colors">Community</Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="font-semibold text-lg mb-6">Contact Us</p>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a href="mailto:info@chaingrid.xyz" className="text-blue-400 hover:underline">info@chaingrid.xyz</a>
              </li>
              <li className="text-gray-400">
                <span className="block">Support:</span>
                <a href="mailto:support@chaingrid.xyz" className="text-blue-400 hover:underline">support@chaingrid.xyz</a>
              </li>
              <li className="text-gray-400">
                <span className="block">Address:</span>
                <span>Blockchain Valley, 123 Crypto Street, Web3 City</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-blue-500/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ChainGrid. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
