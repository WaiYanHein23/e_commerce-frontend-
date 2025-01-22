import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in and fetch user_name
    const token = localStorage.getItem("token");
    const user_name = localStorage.getItem("user_name");
    setIsLoggedIn(!!token && !!user_name);
  }, []);

  return (
    <div>
      <nav className="bg-blue-800 p-6">
        <ul className="flex space-x-4 justify-around items-center">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/post" className="text-white hover:text-gray-300">
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-white px-4 py-2 rounded-lg hover:text-red-600 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
