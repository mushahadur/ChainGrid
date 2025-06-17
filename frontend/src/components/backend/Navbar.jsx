import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="flex space-x-4">
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500/20 text-white" : ""
              }`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500/20 text-white" : ""
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/tags"
            className={({ isActive }) =>
              `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-500/20 text-white" : ""
              }`
            }
          >
            Tags
          </NavLink>
        </div>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white flex items-center space-x-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;