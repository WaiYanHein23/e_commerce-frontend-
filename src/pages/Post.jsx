import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

const Post = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Fetch posts using SWR
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/posts`, async (url) => {
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
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  });

  const onSubmit = async (data) => {
    setApiError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // Revalidate the posts data after successful creation
      await mutate(`${import.meta.env.VITE_API_URL}/posts`);
      reset(); // Reset form fields
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Revalidate the posts data after successful deletion
      await mutate(`${import.meta.env.VITE_API_URL}/posts`);
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
      {/* Create Post Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
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
              className={`mt-1 block w-full rounded-md border ${
                errors.content ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2`}
              rows="4"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        {!posts || posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts?.posts?.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {post.content}
              </p>
              <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                <span>
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <Link
                    to={`/post/${post.id}/edit`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
