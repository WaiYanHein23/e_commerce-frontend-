import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";

const BrandShow = ({ activeTab }) => {
  const [editingBrand, setEditingBrand] = useState(null);
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

  // Fetch brands with SWR
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/brands`,
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
        throw new Error(result.message || "Failed to fetch brands");
      }
      return result;
    }
  );

  // Handle form submission (Create or Update)
  const onSubmit = async (formData) => {
    try {
      const isEditing = !!editingBrand;
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/brands/${editingBrand.id}`
        : `${import.meta.env.VITE_API_URL}/brands`;

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
        throw new Error(`Failed to ${isEditing ? "update" : "create"} brand`);
      }

      mutate(`${import.meta.env.VITE_API_URL}/brands`);
      toast.success(`Brand ${isEditing ? "updated" : "created"} successfully`);

      reset(); // Reset form
      setEditingBrand(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/brands/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${$token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete brand");
      }

      mutate(`${import.meta.env.VITE_API_URL}/brands`);
      toast.success("Brand deleted successfully");

      if (editingBrand && editingBrand.id === id) {
        setEditingBrand(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle edit
  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setValue("name", brand.name);
    setValue("status", brand.status);
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
      {activeTab === "brands" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Brands</h3>

          {/* Create/Edit Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <h4 className="text-md font-semibold">
              {editingBrand ? "Edit Brand" : "Create New Brand"}
            </h4>
            <input
              type="text"
              placeholder="Brand Name"
              {...register("name", { required: "Brand name is required" })}
              className="border p-2 rounded mb-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <select
              {...register("status", { required: "Status is required" })}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ms-2"
            >
              {editingBrand ? "Update" : "Create"}
            </button>

            {editingBrand && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setEditingBrand(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded ms-2"
              >
                Cancel
              </button>
            )}
          </form>

          {/* Brands Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Brand ID
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
                {data?.data.map((brand) => (
                  <tr key={brand.id}>
                    <td className="px-6 py-4 whitespace-nowrap">#{brand.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {brand.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-white rounded ${
                          brand.status == 1 ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {brand.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
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

export default BrandShow;
