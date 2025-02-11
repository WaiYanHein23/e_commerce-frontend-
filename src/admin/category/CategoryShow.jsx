import { useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const CategoryShow = ({ activeTab }) => {
  // State for handling edit mode
  const [editingCategory, setEditingCategory] = useState(null);
  const $token = localStorage.getItem("token");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      status: "",
    },
  });

  // Fetch categories with SWR
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/categories`,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${$token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories");
      }
      return result;
    }
  );

  // Handle create and update category
  const onSubmit = async (formData) => {
    try {
      const isEditing = !!editingCategory; // Check if editing
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/categories/${editingCategory.id}`
        : `${import.meta.env.VITE_API_URL}/categories`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "update" : "create"} category`
        );
      }

      mutate(`${import.meta.env.VITE_API_URL}/categories`);
      toast.success(
        `Category ${isEditing ? "updated" : "created"} successfully`
      );

      // Reset form and exit edit mode
      reset();
      setEditingCategory(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${$token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      mutate(`${import.meta.env.VITE_API_URL}/categories`);
      toast.success("Category deleted successfully");

      // Clear editing state if the deleted category was being edited
      if (editingCategory && editingCategory.id === id) {
        setEditingCategory(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle edit mode
  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("status", category.status);
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div>
      {activeTab === "categories" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>

          {/* Create/Edit Form */}
          <div className="mb-4">
            <h4 className="text-md font-semibold">
              {editingCategory ? "Edit Category" : "Create New Category"}
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Category Name"
                {...register("name", {
                  required: "Category name is required",
                  minLength: 2,
                  maxLength: 50,
                })}
                className="border p-2 rounded"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <select {...register("status")} className="border p-2 rounded">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingCategory ? "Update" : "Create"}
              </button>
            </form>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{category.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-white rounded ${
                          category.status == 1 ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {category.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryShow;
