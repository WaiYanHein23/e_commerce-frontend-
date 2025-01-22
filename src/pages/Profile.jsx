import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const user_name = localStorage.getItem("user_name");
    const user_email = localStorage.getItem("user_email");
    if (user_name) {
      setUserName(user_name);
    }
    if (user_email) {
      setEmail(user_email);
    }
  }, []);

  const handleLogout = () => {
    // Remove all user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    // Redirect to login page
    navigate("/login");
  };

  // Fetch user profile data using SWR
  const { data, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/profile`,
    async (url) => {
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
        throw new Error("Failed to fetch profile");
      }

      return response.json();
    }
  );

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading profile: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header with Logout */}
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Profile Content */}
          {data ? (
            <div className="p-6 space-y-6">
              {/* User Info Section */}
              <div className="border-b pb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-2xl text-white">
                      {userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {userName}
                    </h2>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-gray-800">
                      {new Date(data.user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <p className="text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          )}

          {/* Update the bottom buttons */}
          <div className="flex justify-around p-6">
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
