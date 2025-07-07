
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from '@/assets/images/logo.jpg';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 mr-2 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">
                    <img src={logo} alt="GC" />
                  </span>
                </div>
                <span className="text-xl font-bold gradient-text">ChainGrid</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/features">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
               
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/login">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/register">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Register
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg">
              Download App
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-sm"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg">
                Download App
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
