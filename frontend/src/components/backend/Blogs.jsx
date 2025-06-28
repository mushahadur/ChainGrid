import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableSkeleton from "@/components/backend/TableSkeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit } from "lucide-react";
import Select from "react-select";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    excerpt: "",
    content: "",
    author: "",
    author_role: "",
    category_id: "",
    tag_ids: [],
    image_description: "",
    image: null,
    image_preview: null,
    original_filename: "", // Original filename track করার জন্য
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setBlogs(data.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch blogs.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch categories.", variant: "destructive" });
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tags`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTags(data.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch tags.", variant: "destructive" });
    }
  };

  // const handleCreateOrUpdate = async (e) => {
  //   e.preventDefault();
  //   const method = isEditMode ? "PUT" : "POST";
  //   const url = isEditMode
  //     ? `${import.meta.env.VITE_API_BASE_URL}/blogs/${currentBlog.id}`
  //     : `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  //   try {
  //     const formData = new FormData();
      
  //     // Basic fields
  //     formData.append("title", currentBlog.title);
  //     formData.append("excerpt", currentBlog.excerpt);
  //     formData.append("content", currentBlog.content);
  //     formData.append("author", currentBlog.author);
  //     formData.append("author_role", currentBlog.author_role);
      
  //     if (currentBlog.category_id) {
  //       formData.append("category_id", currentBlog.category_id);
  //     }
      
  //     // Tags handling
  //     currentBlog.tag_ids.forEach((tag, index) => {
  //       formData.append(`tag_ids[${index}]`, tag.value);
  //     });
      
  //     formData.append("image_description", currentBlog.image_description || "");
      
  //     // Image handling with original filename
  //     if (currentBlog.image) {
  //       // File এর original name preserve করার জন্য
  //       const originalName = currentBlog.original_filename || currentBlog.image.name;
        
  //       // File কে সঠিক name দিয়ে append করা
  //       formData.append("image", currentBlog.image, originalName);
        
  //       // Optional: Original filename আলাদাভাবে পাঠানো
  //       formData.append("original_filename", originalName);
  //     }
      
  //     if (isEditMode) {
  //       formData.append("_method", "PUT");
  //     }

  //     // Debug: FormData এর content দেখার জন্য
  //     console.log("FormData contents:");
  //     for (let [key, value] of formData.entries()) {
  //       if (value instanceof File) {
  //         console.log(`${key}: File - ${value.name}, Size: ${value.size}`);
  //       } else {
  //         console.log(`${key}: ${value}`);
  //       }
  //     }

  //     const response = await fetch(url, {
  //       method: isEditMode ? "POST" : "POST", // Laravel এর জন্য POST ব্যবহার করা হচ্ছে
  //       headers: { 
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         // Content-Type header add করবেন না - FormData automatically set করবে
  //       },
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast({
  //         title: isEditMode ? "Blog Updated" : "Blog Created",
  //         description: `Blog "${data.blog.title}" has been ${isEditMode ? "updated" : "created"}.`,
  //       });
  //       setIsModalOpen(false);
  //       fetchBlogs();
  //       resetForm();
  //     } else {
  //       console.error("API Error:", data);
  //       toast({
  //         title: "Error",
  //         description: data.errors ? Object.values(data.errors).join(", ") : "Failed to save.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Request Error:", error);
  //     toast({
  //       title: "Error",
  //       description: "An error occurred while saving the blog.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `${import.meta.env.VITE_API_BASE_URL}/blogs/${currentBlog.id}`
      : `${import.meta.env.VITE_API_BASE_URL}/blogs`;
  
    try {
      const formData = new FormData();
      formData.append("title", currentBlog.title);
      formData.append("excerpt", currentBlog.excerpt);
      formData.append("content", currentBlog.content);
      formData.append("author", currentBlog.author);
      formData.append("author_role", currentBlog.author_role);
      if (currentBlog.category_id) {
        formData.append("category_id", currentBlog.category_id);
      }
      currentBlog.tag_ids.forEach((tag, index) => {
        formData.append(`tag_ids[${index}]`, tag.value);
      });
      formData.append("image_description", currentBlog.image_description || "");
      if (currentBlog.image) {
        formData.append("image", currentBlog.image, currentBlog.original_filename || currentBlog.image.name);
      }
      if (isEditMode) {
        formData.append("_method", "PUT");
      }
  
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        toast({
          title: isEditMode ? "Blog Updated" : "Blog Created",
          description: `Blog "${data.blog.title}" has been ${isEditMode ? "updated" : "created"}.`,
        });
        setIsModalOpen(false);
        fetchBlogs();
        resetForm();
      } else {
        toast({
          title: "Error",
          description: data.errors ? Object.values(data.errors).join(", ") : "Failed to save.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the blog.",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        toast({ title: "Blog Deleted", description: "Blog deleted successfully." });
        fetchBlogs();
      } else {
        toast({ title: "Error", description: "Failed to delete blog.", variant: "destructive" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the blog.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (blog) => {
    setCurrentBlog({
      ...blog,
      category_id: blog.category?.id || "",
      tag_ids: blog.tags.map((tag) => ({ value: tag.id, label: tag.name })),
      image: null,
      image_preview: blog.image || null,
      original_filename: "", // Edit mode এ নতুন file upload না করলে empty রাখা
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentBlog({
      id: null,
      title: "",
      excerpt: "",
      content: "",
      author: "",
      author_role: "",
      category_id: "",
      tag_ids: [],
      image_description: "",
      image: null,
      image_preview: null,
      original_filename: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  
    if (file.size > maxSize) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
  
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please select a valid image file (JPEG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }
  
    const previewUrl = URL.createObjectURL(file);
    setCurrentBlog({
      ...currentBlog,
      image: file,
      image_preview: previewUrl,
      original_filename: file.name,
    });
  };

  
  // Cleanup function for URL.createObjectURL
  useEffect(() => {
    return () => {
      if (currentBlog.image_preview && currentBlog.image_preview.startsWith('blob:')) {
        URL.revokeObjectURL(currentBlog.image_preview);
      }
    };
  }, [currentBlog.image_preview]);

  const blogColumns = [
    { name: "Title", selector: (row) => row.title, sortable: true, wrap: true },
    { name: "Author", selector: (row) => row.author, sortable: true },
    { name: "Category", selector: (row) => row.category?.name || "N/A", sortable: true },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.image_description || "Blog image"}
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          "N/A"
        ),
    },
    { name: "Date", selector: (row) => row.date, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditModal(row)}
            className="text-blue-400 hover:text-blue-500"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.id)}
            className="text-red-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Manage Blogs</h1>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden p-4">
          <div className="flex justify-end mb-4">
            <Button onClick={openCreateModal} className="bg-blue-500 hover:bg-blue-600">
              Create Blog
            </Button>
          </div>
          <DataTable
            columns={blogColumns}
            data={blogs}
            progressPending={isLoading}
            progressComponent={<TableSkeleton columns={blogColumns.length} />}
            pagination
            highlightOnHover
            customStyles={{
              table: { style: { backgroundColor: 'transparent' } },
              headCells: { style: { backgroundColor: '#43434d', color: 'White', fontWeight: 'bold' } },
              cells: { style: { backgroundColor: '#28282b', color: 'White' } },
            }}
          />
        </div>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-y-auto max-h-[90vh] text-white"
        >
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-400">
              {isEditMode ? "Edit Blog" : "Create Blog"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateOrUpdate}>
            <div className="grid gap-3 sm:gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={currentBlog.title}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  required
                  className="bg-gray-800/50 border-blue-500/20 text-base py-2 px-3 focus:ring-blue-500/50"
                  placeholder="Enter blog title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="excerpt" className="text-sm font-medium text-gray-300">
                  Excerpt
                </Label>
                <Input
                  id="excerpt"
                  value={currentBlog.excerpt}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  required
                  className="bg-gray-800/50 border-blue-500/20 text-base py-2 px-3 focus:ring-blue-500/50"
                  placeholder="Enter blog excerpt"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content" className="text-sm font-medium text-gray-300">
                  Content
                </Label>
                <textarea
                  id="content"
                  value={currentBlog.content}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  required
                  className="bg-gray-800/50 border border-blue-500/20 text-base py-2 px-3 rounded-md focus:ring-blue-500/50 min-h-[100px] resize-y"
                  placeholder="Enter blog content"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author" className="text-sm font-medium text-gray-300">
                  Author
                </Label>
                <Input
                  id="author"
                  value={currentBlog.author}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                  required
                  className="bg-gray-800/50 border-blue-500/20 text-base py-2 px-3 focus:ring-blue-500/50"
                  placeholder="Enter author name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author_role" className="text-sm font-medium text-gray-300">
                  Author Role
                </Label>
                <Input
                  id="author_role"
                  value={currentBlog.author_role}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, author_role: e.target.value })}
                  required
                  className="bg-gray-800/50 border-blue-500/20 text-base py-2 px-3 focus:ring-blue-500/50"
                  placeholder="Enter author role"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category_id" className="text-sm font-medium text-gray-300">
                  Category
                </Label>
                <select
                  id="category_id"
                  value={currentBlog.category_id}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, category_id: e.target.value })}
                  className="bg-gray-800/50 border border-blue-500/20 text-base py-2 px-3 rounded-md focus:ring-blue-500/50 text-white"
                >
                  <option value="" className="text-gray-400">
                    No Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="text-white">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tag_ids" className="text-sm font-medium text-gray-300">
                  Tags
                </Label>
                <Select
                  id="tag_ids"
                  isMulti
                  options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                  value={currentBlog.tag_ids}
                  onChange={(selected) => setCurrentBlog({ ...currentBlog, tag_ids: selected })}
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "rgba(31, 41, 55, 0.5)",
                      borderColor: "rgba(59, 130, 246, 0.2)",
                      color: "white",
                      padding: "0.25rem",
                      borderRadius: "0.375rem",
                      "&:hover": { borderColor: "rgba(59, 130, 246, 0.5)" },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "rgba(31, 41, 55, 0.9)",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "rgba(59, 130, 246, 0.3)"
                        : state.isFocused
                        ? "rgba(59, 130, 246, 0.1)"
                        : "transparent",
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.2)" },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.5)" },
                    }),
                    input: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "white",
                    }),
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-sm font-medium text-gray-300">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-800/50 border-blue-500/20 text-base text-white"
                />
                {currentBlog.original_filename && (
                  <p className="text-sm text-gray-400 mt-1">
                    Selected: {currentBlog.original_filename}
                  </p>
                )}
                {currentBlog.image_preview && (
                  <img
                    src={currentBlog.image_preview}
                    alt={currentBlog.image_description || "Preview"}
                    className="mt-2 h-16 sm:h-20 w-16 sm:w-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image_description" className="text-sm font-medium text-gray-300">
                  Image Description
                </Label>
                <Input
                  id="image_description"
                  value={currentBlog.image_description}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, image_description: e.target.value })
                  }
                  className="bg-gray-800/50 border-blue-500/20 text-base py-2 px-3 focus:ring-blue-500/50"
                  placeholder="Enter image description"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-blue-500/20 text-gray-300 hover:bg-blue-500/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;