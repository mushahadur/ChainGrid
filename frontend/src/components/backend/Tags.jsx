import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit } from "lucide-react";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTag, setCurrentTag] = useState({ id: null, name: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tags`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTags(data.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch tags.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `${import.meta.env.VITE_API_BASE_URL}/tags/${currentTag.id}`
      : `${import.meta.env.VITE_API_BASE_URL}/tags`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: currentTag.name }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: isEditMode ? "Tag Updated" : "Tag Created",
          description: `Tag "${data.data.name}" has been ${isEditMode ? "updated" : "created"}.`,
        });
        setIsModalOpen(false);
        fetchTags();
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
        description: "An error occurred while saving the tag.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tags/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.ok) {
        toast({ title: "Tag Deleted", description: "Tag deleted successfully." });
        fetchTags();
      } else {
        toast({ title: "Error", description: "Failed to delete tag.", variant: "destructive" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the tag.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (tag) => {
    setCurrentTag({ id: tag.id, name: tag.name });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentTag({ id: null, name: "" });
  };

  const tagColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Manage Tags</h1>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden p-4">
          <div className="flex justify-end mb-4">
            <Button onClick={openCreateModal} className="bg-blue-500 hover:bg-blue-600">
              Create Tag
            </Button>
          </div>
          <DataTable
            columns={tagColumns}
            data={tags}
            progressPending={isLoading}
            pagination
            highlightOnHover
            customStyles={{
              table: { style: { backgroundColor: "transparent" } },
              headCells: { style: { backgroundColor: "#43434d", color: "White", fontWeight: "bold" } },
              cells: { style: {backgroundColor: "#28282b", color: "White" } },
            }}
          />
        </div>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Tag" : "Create Tag"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateOrUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentTag.name}
                  onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tags;