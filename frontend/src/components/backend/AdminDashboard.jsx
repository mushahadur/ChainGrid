import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Updated path
import Blogs from "./Blogs"; // Updated path
import Category from "./Category"; // Updated path
import Tags from "./Tags"; // Updated path

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Prevent rendering before redirect
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="blogs" element={<Blogs />} />
        <Route path="categories" element={<Category />} />
        <Route path="tags" element={<Tags />} />
        <Route path="*" element={<Navigate to="blogs" replace />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;