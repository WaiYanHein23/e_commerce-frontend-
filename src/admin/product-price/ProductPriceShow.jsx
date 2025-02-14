import React from "react";

const ProductPriceShow = ({ activeTab }) => {
  return (
    <div>
      {activeTab === "product-price" && (
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

export default ProductPriceShow;
