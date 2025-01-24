import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch post data using SWR
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/posts/${id}`,
    async (url) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch post");
      }

      return response.json();
    }
  );

  // Set form default values when post data is loaded
  useEffect(() => {
    if (data) {
      reset({
        title: data.title || "",
        content: data.content || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    setApiError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      // Revalidate both the single post and posts list
      await mutate(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      await mutate(`${import.meta.env.VITE_API_URL}/posts`);

      // Redirect back to posts page
      navigate("/post");
    } catch (err) {
      setApiError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || apiError) {
    return (
      <div className="text-center p-4 text-red-500">
        Error: {error?.message || apiError}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Post</h2>
          <Link
            to="/post"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back to Posts
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title must not exceed 100 characters",
                },
              })}
              className={`mt-1 block w-full rounded-md border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
                maxLength: {
                  value: 1000,
                  message: "Content must not exceed 1000 characters",
                },
              })}
              rows="6"
              className={`mt-1 block w-full rounded-md border ${
                errors.content ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/post"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
