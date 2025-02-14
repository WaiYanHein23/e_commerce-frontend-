import { useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Product = ({ activeTab }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const $token = localStorage.getItem("token");
  const API_URL = `${import.meta.env.VITE_API_URL}/products`;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      color_id: "",
      size_id: "",
      product_price_id: "",
      image_path: null,
      brand_id: "",
      category_id: "",
    },
  });

  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${$token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  };

  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  const onSubmit = async (formData) => {
    try {
      const isEditing = !!editingProduct;
      const url = isEditing ? `${API_URL}/${editingProduct.id}` : API_URL;
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${$token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} product`);
      }

      mutate(API_URL);
      toast.success(
        `Product ${isEditing ? "updated" : "created"} successfully`
      );
      reset();
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${$token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      mutate(API_URL);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setValue("name", product.name);
    setValue("color_id", product.color_id);
    setValue("size_id", product.size_id);
    setValue("product_price_id", product.product_price_id);
    setValue("brand_id", product.brand_id);
    setValue("category_id", product.category_id);
    setValue("image_path", product.image_path);
  };

  if (error) return <div>Error loading products</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {activeTab === "products" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Products Management</h3>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <select
                {...register("category_id", {
                  required: "Category is required",
                })}
                className="w-full p-2 border rounded"
              >
                <option disabled value="">
                  Select Category
                </option>
                {data?.products?.map((p) => (
                  <option key={p.id} value={p.categories[0].name}>
                    {p.categories[0].name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <span className="text-red-500">
                  {errors.category_id.message}
                </span>
              )}

              <select
                {...register("brand_id", { required: "Brand is required" })}
                className="w-full p-2 border rounded"
              >
                <option disabled value="">
                  Select Brand
                </option>
                {data?.products?.map((p) => (
                  <option key={p.id} value={p.brands[0].name}>
                    {p.brands[0].name}
                  </option>
                ))}
              </select>

              {errors.brand_id && (
                <span className="text-red-500">{errors.brand_id.message}</span>
              )}

              <select
                {...register("color_id", { required: "Color is required" })}
                className="w-full p-2 border rounded"
              >
                <option disabled value="">
                  Select Color
                </option>
                {data?.products?.map((p) =>
                  p.colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))
                )}
              </select>

              {errors.color_id && (
                <span className="text-red-500">{errors.color_id.message}</span>
              )}

              <select
                {...register("size_id", { required: "Size is required" })}
                className="w-full p-2 border rounded"
              >
                <option disabled value="">
                  Select Size
                </option>
                {data?.products?.map((p) =>
                  p.sizes.map((size) => (
                    <option key={size.id} value={size.name}>
                      {size.name}
                    </option>
                  ))
                )}
              </select>

              {errors.size_id && (
                <span className="text-red-500">{errors.size_id.message}</span>
              )}

              <select
                {...register("product_price_id", {
                  required: "Price is required",
                })}
                className="w-full p-2 border rounded"
              >
                <option disabled value="">
                  Select Price
                </option>
                {data?.products?.map((p) =>
                  p.product_prices.map((price) => (
                    <option key={price.id} value={price.id}>
                      {price.price}
                    </option>
                  ))
                )}
              </select>

              {errors.product_price_id && (
                <span className="text-red-500">
                  {errors.product_price_id.message}
                </span>
              )}

              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <input
                type="file"
                {...register("image_path")}
                className="w-full p-2 border rounded"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Product Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product.id} className="my-3">
                  <td className=" text-center my-3">{product.name}</td>
                  <td className=" text-center">
                    {product.colors.map((color) => color.name)}
                  </td>
                  <td className=" text-center">
                    {product.sizes.map((size) => size.name)}
                  </td>
                  <td className="text-center">
                    {product.product_prices.map((data) => data.price)}
                  </td>
                  <td className=" text-center">
                    {product.brands.map((brand) => brand.name)}
                  </td>
                  <td className=" text-center">
                    {product.categories.map((category) => category.name)}
                  </td>
                  <td className="flex justify-center items-center my-3">
                    <img
                      src={product.image_path}
                      alt={product.name}
                      width="70"
                      height="50"
                    />
                  </td>

                  <td className="mt-3 text-center ">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
      )}
    </div>
  );
};

export default Product;
